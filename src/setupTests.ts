// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import ReactDOM from 'react-dom';

// Polyfill for React 19 - ReactDOM.findDOMNode removed
// Material-UI v4 still uses this deprecated API
if (!(ReactDOM as any).findDOMNode) {
  (ReactDOM as any).findDOMNode = (instance: any) => {
    if (!instance) return null;
    if (instance.nodeType === 1) return instance;
    // Create a mock DOM element for testing purposes
    return {
      nodeType: 1,
      scrollTop: 0,
      scrollLeft: 0,
      offsetHeight: 0,
      offsetWidth: 0,
      style: {},
      classList: {
        add: () => {},
        remove: () => {},
        contains: () => false,
      },
      addEventListener: () => {},
      removeEventListener: () => {},
    };
  };
}

// Vitest is our runner. Provide a Jest-compatible global shim so existing
// test files that use `jest.*` still work without changes.
// Note: This shim maps the most commonly used APIs to `vi`.
declare const vi: any;
(globalThis as any).jest = {
  ...vi,
  fn: vi.fn,
  spyOn: vi.spyOn,
  mock: vi.mock,
  clearAllMocks: vi.clearAllMocks,
  resetAllMocks: vi.resetAllMocks,
  restoreAllMocks: vi.restoreAllMocks,
};

// Mock the 'react-i18next' module globally for all tests
// to avoid loading i18n resources and focus on component logic.
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { language: 'en-US', changeLanguage: vi.fn() },
  }),
  Trans: (props: any) => props.children,
}));

// Polyfill window.matchMedia for tests (used by MUI useMediaQuery)
if (!(window as any).matchMedia) {
  (window as any).matchMedia = (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  });
}

// Provide safe defaults for react-router where harmless.
// Do NOT mock useHistory here so individual tests can control and assert navigation.
vi.mock('react-router', async () => {
  const actual: any = await vi.importActual('react-router');
  return {
    ...actual,
    useParams: () => ({ id: 'test-id' }),
  };
});

// Stabilize Material-UI useMediaQuery to avoid theme/breakpoints null errors
vi.mock('@mui/material/useMediaQuery', () => ({
  __esModule: true,
  default: () => false,
}));

// Note: ULID is mocked per-test where needed; no global mock here to avoid conflicts.

// In-memory Firestore mock to prevent network access during unit tests.
// This mocks the minimal subset of APIs used by our repository layer.
vi.mock('firebase/firestore', () => {
  type DocData = Record<string, any>;

  const dbStore = new Map<string, DocData>();

  const pathFor = (segments: string[]) => segments.join('/');

  // Simple snapshot shims
  class DocSnapshot {
    constructor(private _exists: boolean, private _data?: any) {}
    exists() { return this._exists; }
    data() { return this._data; }
  }

  const getFirestore = (_app?: any) => ({ __db: true });
  const initializeApp = (cfg: any) => ({ __app: true, cfg });

  const collection = (_db: any, ...segments: string[]) => ({ __collection: true, segments });
  const doc = (_db: any, ...segments: string[]) => ({ __doc: true, segments });

  const setDoc = async (docRef: any, data: any) => {
    const key = pathFor(docRef.segments);
    dbStore.set(key, JSON.parse(JSON.stringify(data)));
  };

  const updateDoc = async (docRef: any, data: any) => {
    const key = pathFor(docRef.segments);
    const existing = dbStore.get(key);
    if (!existing) {
      // For unit tests we create if missing to avoid NOT_FOUND
      dbStore.set(key, JSON.parse(JSON.stringify(data)));
    } else {
      dbStore.set(key, { ...existing, ...JSON.parse(JSON.stringify(data)) });
    }
  };

  const deleteDoc = async (docRef: any) => {
    const key = pathFor(docRef.segments);
    dbStore.delete(key);
  };

  const getDoc = async (docRef: any) => {
    const key = pathFor(docRef.segments);
    const data = dbStore.get(key);
    return new DocSnapshot(!!data, data);
  };

  const getDocs = async (colRefOrQuery: any) => {
    // If collection path ends with 'players', fetch all children beneath that path
    const basePath = pathFor(colRefOrQuery.segments);
    const docs: any[] = [];
    dbStore.forEach((value, key) => {
      if (key.startsWith(basePath + '/')) {
        // ensure one more segment (doc id)
        const rest = key.substring(basePath.length + 1);
        if (!rest.includes('/')) {
          docs.push({ data: () => value, ref: { __key: key } });
        }
      }
    });
    return {
      forEach: (cb: (d: any) => void) => docs.forEach(cb),
      docs,
    } as any;
  };

  const where = (_field: string, _op: any, _val: any) => ({ __where: true });
  const query = (colRef: any, _whereClause: any) => colRef;

  // Provide onSnapshot as a jest/vi mock so tests can control it when needed.
  const onSnapshot = vi.fn();

  return {
    getFirestore,
    initializeApp,
    collection,
    doc,
    setDoc,
    updateDoc,
    deleteDoc,
    getDoc,
    getDocs,
    where,
    query,
    onSnapshot,
  };
});

// Note: repository functions are typically mocked per-test files using jest/vi.
// Avoid mocking '../repository/firebase' globally to let tests control behavior.
