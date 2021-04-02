# How to use useReducer and useContext hooks with Typescript in React

## Introduction

Are your components complex with too many states and props?. It is time to use UseReducer and UseContext hooks now. This will help your components look cleaner and simple.

In this article, we will see how to use useReducer and useContext hooks together with typescript in a step-by-step guide. If you are not familiar with useReducer and useContext, have read through in ReactJS site

**What is useReducer?.**
<https://reactjs.org/docs/hooks-reference.html#usereducer>

**What is useContext?.**
<https://reactjs.org/docs/hooks-reference.html#usecontext>

To showcase the use of useReducer and useContext hooks, we will create a simple poker game app in React and manage the game state using useReducer/useContext hooks. Let's get started.
Note: All the code sample mentioned below can be found in the github repo [here] (<https://github.com/hellomuthu23/react-context-example>)

## Steps

1. **Create React app** with typescript
   Let's create a React app using `create-react-app`

    ```shell
    npx create-react-app react-context-app --template typescript
    # or
    yarn create react-app react-context-app --template typescript
    ```

    Navigate to react-context-app and run `yarn start` command to start the app. Access the app <http://localhost:3000>

1. **Add State**: Let's create a GameState that will hold the game state, the state will have players, gameName, winner details, and game status.
   - Create `state.ts` with GameState and initial state

    ```ts
    export interface GameState {
        players: Player[];
        gameName: string;
        winner: Player | null;
        gameStatus: Status;
    }

    export enum Status {
        NotStarted = 'Not Started',
        InProgress = 'In Progress',
        Finished = 'Finished',
    }

    export interface Player {
        name: string;
        id: number;
        status: Status;
        value?: number;
    }

    export const initialGameState: GameState = {
        players: [],
        gameName: 'Game1',
        winner: null,
        gameStatus: Status.NotStarted,
    };
    ```

1. **Add Actions**: Now let's add required Actions types for the poker games, actions like adding a player to the game, resetting the game, and playing the game.
   - Create `actions.ts` with the below actions

    ```ts
    export enum ActionType {
        AddPlayer,
        SetPlayerValue,
        ResetGame,
    }

    export interface AddPlayer {
        type: ActionType.AddPlayer;
        payload: Player;
    }

    export interface SetPlayerValue {
        type: ActionType.SetPlayerValue;
        payload: { id: number; value: number };
    }

    export interface ResetGame {
        type: ActionType.ResetGame;
    }

    export type GameActions = AddPlayer | SetPlayerValue | ResetGame;

    ```

1. **Add Reducer**: Let's add a reducer file that will update the state for specific/required actions and side effects(calculate winner, game status, etc).
   - Create `reducer.ts` with the below functions

    ```ts
    export function gameReducer(state: GameState, action: GameActions): GameState {
        switch (action.type) {
            case ActionType.AddPlayer:
            return { ...state, players: [action.payload, ...state.players] };
            case ActionType.ResetGame:
            return {
                ...initialGameState,
                players: state.players.map((player) => ({
                ...player,
                status: Status.NotStarted,
                value: 0,
                })),
            };
            case ActionType.SetPlayerValue:
            let newState = {
                ...state,
                players: state.players.map((player: Player) =>
                player.id === action.payload.id
                    ? {
                        ...player,
                        value: action.payload.value,
                        status: Status.Finished,
                    }
                    : player
                ),
            };

            return {
                ...newState,
                winner: getWinner(newState.players),
                gameStatus: getGameStatus(newState),
            };

            default:
            return state;
        }
    }

    const getWinner = (players: Player[]): Player | null => {
        let winnerValue = 0;
        let winner = null;
        players.forEach((player) => {
            if (player.value && player.value > winnerValue) {
            winner = player;
            winnerValue = player.value || 0;
            }
        });
        return winner;
    };

    const getGameStatus = (state: GameState): Status => {
        const totalPlayers = state.players.length;
        let numberOfPlayersPlayed = 0;
        state.players.forEach((player) => {
            if (player.status === Status.Finished) {
            numberOfPlayersPlayed++;
            }
        });
        if (numberOfPlayersPlayed === 0) {
            return Status.NotStarted;
        }
        if (totalPlayers === numberOfPlayersPlayed) {
            return Status.Finished;
        }
        return Status.InProgress;
    };

    // helper functions to simplify the caller
    export const addPlayer = (player: Player): AddPlayer => ({
        type: ActionType.AddPlayer,
        payload: player,
    });

    export const setPlayerValue = (id: number, value: number): SetPlayerValue => ({
        type: ActionType.SetPlayerValue,
        payload: { id, value },
    });

    export const resetGame = (): ResetGame => ({
        type: ActionType.ResetGame,
    });
    ```

1. **Add Context**: Now let's add a context file
   - Create `context.ts` with below GameContext that uses the above-created State

    ```ts
        export const GameContext = React.createContext<{
        state: GameState;
        dispatch: React.Dispatch<GameActions>;
        }>({
            state: initialGameState,
            dispatch: () => undefined,
        });
    ```

1. **Add useContext and useReducer hook** to the App: Now that we have created the necessary context, state, etc, we can add them into the app.
   - Create a new component `Poker.tsx` for the poker game and add Context and useReducer hook as below. Ignore the errors for `<PlayerList />,  <Players /> , <GameStatus /> and <AddPlayer />` components for now, we will add these components in the coming steps.
    `GameContext.Provider` is the context provider here, any child component under this provider will have access to the context(i.e state and dispatch)

    ```tsx
    export const Poker = () => {
        const [state, dispatch] = useReducer(gameReducer, initialGameState);
        return (
            <GameContext.Provider value={{ state, dispatch }}>
                <div className='Header'>
                    <header>
                        <p>React useReducer and useContext example Poker App</p>
                    </header>
                </div>
                <div className='ContentArea'>
                    <div className='LeftPanel'>
                        <PlayersList />
                    </div>
                    <div className='MainContentArea'>
                        <Players />
                    </div>
                    <div className='RightPanel'>
                        <GameStatus />
                    </div>
                </div>
                <div className='Footer'>
                    <AddPlayer />
                </div>
            </GameContext.Provider>
        );
    };
    ```

    Add the `<Poker/>` component to `App.tsx` component file.

1. **Add Components**: It's time to add the components and play the game.

   - Add `AddPlayer.tsx` component: This component will be responsible for adding new players to the game and updating the GameState using dispatch actions. We can access the GameState/Reducer using the useContext Hook here, `useContext(GameContext)`

    ```ts
    export const AddPlayer = () => {
        const { dispatch } = useContext(GameContext);
       
        const [playerName, setPlayerName] = useState('');
        
        const handlePlayerNameChange = (event: ChangeEvent<HTMLInputElement>) => {
            setPlayerName(event.target.value);
        };

        const handleSubmit = (event: FormEvent) => {
            const player: Player = {
            id: +new Date(),
            name: playerName,
            status: Status.NotStarted,
            };
            dispatch(addPlayer(player));
            setPlayerName('');
            event.preventDefault();
        };
        return (
            <>
            <h4>Add New Player</h4>
            <form onSubmit={handleSubmit}>
                <input
                value={playerName}
                type='text'
                onChange={handlePlayerNameChange}
                />
                <button type='submit' value='Submit' disabled={playerName === ''}>
                Add
                </button>
            </form>
            </>
        );
    };
    ```

   - Add `PlayersList.tsx` component: This component will show a list of players in the game. Again we use the amazing useContext hook to get list players from GameState.

    ```ts
    export const PlayersList = () => {
        const { state } = useContext(GameContext);
        return (
            <div className='PlayersList'>
            <h4>Players</h4>
            {state.players.map((player) => (
                <label>{player.name}</label>
            ))}
            </div>
        );
    };
    ```

   - Add `Players.tsx` component: This is the player's play area component. The component will show the player's status, card value, and a button to play the game. Again we use the amazing useContext hook to get players status from GameState and dispatch player action.

    ```ts
    export const Players = () => {
        const { state, dispatch } = useContext(GameContext);
        const playPlayer = (id: number) => {
            const randomValue = Math.floor(Math.random() * 100);
            dispatch(setPlayerValue(id, randomValue));
        };
        return (
            <div>
            <h4>Players Status</h4>
            <div className='PlayersContainer'>
                {state.players.map((player: Player) => (
                <div key={player.id} className='Player'>
                    <label>Name: {player.name}</label>
                    <label>Status : {player.status}</label>
                    <label>Card Value: {player.value}</label>
                    <button
                    disabled={player.status !== Status.NotStarted}
                    onClick={() => playPlayer(player.id)}
                    >
                    Show Card
                    </button>
                </div>
                ))}
            </div>
            </div>
        );
    };
    ```

   - Add `GameStatus.tsx` component. Now finally we need to add a component to display the game status and winner information. The component also has a button to restart/reset the game, when the game is reset it clears all players card value and reset the game status(refer the reducer file on how this is done)

    ```ts
    export const GameStatus = () => {
        const { state, dispatch } = useContext(GameContext);
        return (
            <div className='GameStatus'>
            <div className='Status'>
                <h4>Game Status</h4>
                <label>{state.gameStatus}</label>
                <button onClick={() => dispatch(resetGame())}>Start New Game</button>
            </div>
            <div className='Winner'>
                {state.gameStatus === Status.InProgress && (
                <label>
                    In Lead : {state.winner?.name} by {state.winner?.value}
                </label>
                )}
                {state.gameStatus === Status.Finished && (
                <label>
                    Winner: {state.winner?.name} by {state.winner?.value}
                </label>
                )}
            </div>
            </div>
        );
    };
    ```

**Add css file**: copy the required css files from the github repo here: <https://github.com/hellomuthu23/react-context-example>

**Play the Game**: Once you have added all necessary components, css and states, you should be ready to play the game and see the use of useContext and useReducer hooks in action.

## Conclusion

Hope you had fun creating useContext and useReducer hooks and playing the game. As you have seen, the components looks lot clean without too many props/state and easy to manage the state/actions using useContext hook.

Full working demo: <https://codesandbox.io/s/quirky-grass-4f0yf?fontsize=14&hidenavigation=1&theme=dark>

Github repo: <https://github.com/hellomuthu23/react-context-example>
