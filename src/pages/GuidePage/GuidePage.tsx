import { GoogleAd } from '../../components/GoogleAd/GoogleAd';

export const GuidePage = () => {
  return (
    <div className='flex flex-col items-center w-full'>
      <GuideContent />
      <GoogleAd />
    </div>
  );
};

export const GuideContent = () => {
  return (
    <div className='flex flex-col items-center w-full'>
      <div className='w-full max-w-3xl flex flex-col items-center justify-center my-8'>
        <div className='animate-fade-in-down'>
          <h2 className='text-2xl font-bold mb-4'>
            Guidelines on estimating user stories in Agile
          </h2>
          <div className='text-base'>
            <p>
              1. <b>Understand the User Story</b>:<br />
              Before estimating, ensure that the team has a clear understanding of the user story.
              The product owner or the person responsible for defining the user story should provide
              sufficient context and answer any questions from the team. The team should have a
              shared understanding of the user story's purpose, functionality, and expected
              outcomes.
            </p>
            <br />
            <p>
              2. <b>Determine Estimation Scale</b>:<br />
              Choose an estimation scale that suits your team's needs. The most common scales used
              in Agile are Fibonacci sequence (1, 2, 3, 5, 8, 13, 21, etc.), T-shirt sizes (XS, S,
              M, L, XL), or linear scale (1-10). Select a scale that allows for enough
              differentiation between estimations and avoids spending excessive time on fine-grained
              estimates.
            </p>
            <br />
            <p>
              3. <b>Relative Sizing</b>:<br />
              Agile estimation focuses on relative sizing, where the team compares the effort or
              complexity of one user story with another. This approach helps avoid the pitfalls of
              trying to estimate absolute time. Relative sizing allows for a more straightforward
              and faster estimation process.
            </p>
            <br />
            <p>
              4. <b>Use Reference User Stories</b>:<br />
              Create a set of reference user stories that the team collectively agrees on. These
              reference stories serve as benchmarks against which other user stories can be
              compared. The team can assign a standard estimation value to each reference story
              based on its complexity, effort, or size.
            </p>
            <br />
            <p>
              5. <b>Conduct Estimation Sessions</b>:<br />
              Organize estimation sessions with the entire team present. The team members
              responsible for implementing the user stories should be actively involved in the
              estimation process. Use techniques such as Planning Poker, where team members
              privately select estimation values, and then reveal them simultaneously, allowing for
              discussion and convergence.
            </p>
            <br />
            <p>
              6. <b>Discuss and Resolve Differences</b>:<br />
              Encourage open discussion during estimation sessions. If team members provide
              different estimations, have them share their reasoning and insights. This discussion
              helps to uncover assumptions, identify risks or dependencies, and clarify any
              misunderstandings. The goal is to reach a consensus estimation.
            </p>
            <br />
            <p>
              7. <b>Update and Refine Estimations</b>:<br />
              After the estimation session, update the user story estimates in the product backlog
              or Agile management tool. As the project progresses, continue to refine the estimates
              based on actual effort or complexity experienced during implementation. This
              continuous refinement improves the accuracy of future estimations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
