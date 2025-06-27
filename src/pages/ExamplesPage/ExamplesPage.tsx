export const ExamplesPage = () => {
  return (
    <div className='flex flex-col items-center w-full'>
      <ExamplesContent />
    </div>
  );
};

export const ExamplesContent = () => {
  return (
    <div className='flex flex-col items-center w-full'>
      <div className='w-full max-w-3xl flex flex-col items-center justify-center my-8'>
        <div className='animate-fade-in-down'>
          <h2 className='text-2xl font-bold mb-4'>Examples of User Story Estimation</h2>
          <div className='text-base'>
            <p>
              <b>User Story:</b> As a user, I want to be able to log in to the application using my
              email and password.
              <br />
              <br />
              <b>Estimation:</b> 3 story points (Fibonacci sequence)
              <br />
              <br />
              <b>Rationale:</b> The team considers this user story to have medium complexity
              compared to other user stories. It involves implementing authentication logic,
              verifying credentials, and providing appropriate error handling. The team's collective
              experience and judgment led to the consensus estimation of 3 story points.
            </p>
            <hr className='my-6 border-t border-gray-300' />

            <p>
              <b>User Story:</b> As a user, I want to search for products based on various filters
              (e.g., price, category, brand).
              <br />
              <br />
              <b>Estimation:</b> 5 story points (Fibonacci sequence)
              <br />
              <br />
              <b>Rationale:</b> The team considers this user story to be more complex compared to
              simpler user stories. Implementing the search functionality involves handling multiple
              filter options, integrating with the database, and ensuring efficient search
              performance. The team estimates it to be a moderate-sized task.
            </p>
            <hr className='my-6 border-t border-gray-300' />

            <p>
              <b>User Story:</b> As an administrator, I want to be able to generate monthly reports
              on user activity and sales performance.
              <br />
              <br />
              <b>Estimation:</b> 8 story points (Fibonacci sequence)
              <br />
              <br />
              <b>Rationale:</b> The team identifies this user story as a larger and more involved
              task. It requires designing and implementing reporting functionalities, gathering and
              aggregating data from multiple sources, and generating meaningful insights. The
              complexity and effort involved lead to a higher estimation.
            </p>
            <hr className='my-6 border-t border-gray-300' />

            <p>
              <b>User Story:</b> As a user, I want to be able to reset my password if I forget it.
              <br />
              <br />
              <b>Estimation:</b> 2 story points (Fibonacci sequence)
              <br />
              <br />
              <b>Rationale:</b> The team considers this user story relatively simple and
              straightforward. Implementing a password reset functionality typically involves
              providing an email verification mechanism and updating the user's password in the
              database. The team estimates it to be a smaller task compared to others.
            </p>
            <hr className='my-6 border-t border-gray-300' />

            <p>
              <b>User Story:</b> As a user, I want to be able to add products to my shopping cart
              and proceed to checkout.
              <br />
              <br />
              <b>Estimation:</b> Medium (T-shirt size)
              <br />
              <br />
              <b>Rationale:</b> The team uses T-shirt sizes for estimation. Adding products to a
              shopping cart and enabling the checkout process involves handling user interactions,
              managing cart state, updating inventory, and integrating with payment gateways. The
              team estimates it to be of medium size in terms of effort and complexity.
            </p>
            <hr className='my-6 border-t border-gray-300' />

            <p>
              <b>User Story:</b> As a user, I want to be able to upload and attach files to my
              project tasks.
              <br />
              <br />
              <b>Estimation:</b> 3 story points (Fibonacci sequence)
              <br />
              <br />
              <b>Rationale:</b> The team considers this user story to be of moderate complexity.
              Implementing file upload functionality involves handling file storage, validation, and
              linking files to specific tasks or projects. The team estimates it to be a
              medium-sized task.
            </p>
            <hr className='my-6 border-t border-gray-300' />

            <p>
              <b>User Story:</b> As an administrator, I want to be able to create and manage user
              roles and permissions.
              <br />
              <br />
              <b>Estimation:</b> 5 story points (Fibonacci sequence)
              <br />
              <br />
              <b>Rationale:</b> The team identifies this user story as a larger and more complex
              task. Implementing role-based access control requires designing a flexible permission
              system, defining roles, managing user permissions, and ensuring proper security
              measures. The effort and complexity involved lead to a higher estimation.
            </p>
            <hr className='my-6 border-t border-gray-300' />

            <p>
              <b>User Story:</b> As a user, I want to receive email notifications for important
              updates and events.
              <br />
              <br />
              <b>Estimation:</b> 2 story points (Fibonacci sequence)
              <br />
              <br />
              <b>Rationale:</b> The team considers this user story relatively straightforward.
              Implementing email notifications involves integrating with an email service provider,
              setting up templates, and triggering emails based on specific events or triggers. The
              team estimates it to be a smaller task compared to others.
            </p>
            <hr className='my-6 border-t border-gray-300' />

            <p>
              <b>User Story:</b> As a user, I want to be able to filter and sort search results
              based on different criteria.
              <br />
              <br />
              <b>Estimation:</b> 3 story points (Fibonacci sequence)
              <br />
              <br />
              <b>Rationale:</b> The team identifies this user story as a moderate-sized task.
              Implementing filtering and sorting functionality requires handling user preferences,
              building flexible search queries, and presenting sorted and filtered results. The team
              estimates it to be of medium complexity and effort.
            </p>
            <hr className='my-6 border-t border-gray-300' />

            <p>
              <b>Note:</b> These estimations are based on hypothetical scenarios, and actual
              estimations may vary based on project-specific factors, team dynamics, and technology
              considerations. The primary aim is to establish a relative understanding of effort or
              complexity to aid in prioritization and planning.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
