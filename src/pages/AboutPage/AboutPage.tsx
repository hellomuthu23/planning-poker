import { Box, Grid, Slide, Typography } from '@material-ui/core';
import React from 'react';
import How from './../../images/how.jpg';
import What from './../../images/what.jpg';
import BestPractices from './../../images/best-practices.jpg';

import Benefits from './../../images/benefits.jpg';

import '../HomePage/HomePage.css';

export const AboutPage = () => {
  return (
    <>
      <Grid container direction='column' justify='center' alignItems='center'>
        <AboutPlanningPokerContent />
      </Grid>
    </>
  );
};

export const AboutPlanningPokerContent = () => {
  return (
    <>
      <Grid container item sm={12} lg={9} justify='center' alignItems='center'>
        <Grid item sm={12} lg={6}>
          <Slide in={true} direction='up' timeout={2000}>
            <div className='HomePageContainer'>
              <Typography variant='h5'>What is Agile Planning Poker?</Typography>
              <br />
              <Typography variant='body1'>
                In Agile software development, accurate estimation of tasks is crucial for effective planning and
                project success. Agile Planning Poker is a collaborative technique that leverages the wisdom of the team
                to estimate effort, complexity, or relative size of user stories or tasks. In this article, we will
                delve into the details of Agile Planning Poker, its benefits, and how it can revolutionize the
                estimation process for Agile teams.
                <br></br>
                Agile Planning Poker, also known as Scrum Poker, is a consensus-based estimation technique used in Agile
                projects. It involves a team of individuals with diverse expertise collectively assigning effort points
                or story points to user stories, features, or tasks. This technique facilitates discussion, knowledge
                sharing, and alignment among team members, ensuring a more accurate estimation process.
              </Typography>
            </div>
          </Slide>
        </Grid>
        <Grid item sm={12} lg={6}>
          <Slide in={true} direction='up' timeout={2000}>
            <div className='HomePageContainer'>
              <Box padding={2}>
                <img alt='What' src={What}></img>
              </Box>
            </div>
          </Slide>
        </Grid>
      </Grid>
      <br></br>
      <br></br>
      <Grid container item sm={12} lg={9} justify='center' alignItems='center'>
        <Grid item sm={12} lg={6}>
          <Slide in={true} direction='up' timeout={2000}>
            <div className='HomePageContainer'>
              <Box padding={2}>
                <img alt='How' src={How}></img>
              </Box>
            </div>
          </Slide>
        </Grid>
        <Grid item sm={12} lg={6}>
          <Slide in={true} direction='up' timeout={2000}>
            <div className='HomePageContainer'>
              <Typography variant='h5'>How Agile Planning Poker Works</Typography>
              <br />
              <Typography variant='body1'>
                a. <b>Team Collaboration</b>: Agile Planning Poker brings together the entire Agile team, including
                developers, testers, product owners, and scrum masters. Each team member receives a deck of cards with
                values representing the effort or complexity of the work to be estimated.
                <br />
                b. <b>User Story Presentation</b>: The product owner presents a user story or task to the team,
                explaining its purpose, requirements, and expected outcomes. This ensures a common understanding of the
                work to be estimated.
                <br />
                c. <b>Individual Estimation</b>: Each team member privately selects a card representing their estimate
                of effort or complexity. The cards are kept face down until everyone has made their estimation.
                <br />
                d. <b>Revealing Estimations</b>: On a predetermined signal, all team members simultaneously reveal their
                selected cards. This reveals a range of estimates and encourages discussion and justification for the
                differing estimations.
                <br />
                e. <b>Consensus Building</b>: Team members discuss their reasoning, clarifying any uncertainties and
                sharing their perspectives. Through open dialogue, consensus is reached, and the team converges on a
                shared estimation.
                <br />
                f. <b>Repeating the Process</b>: The Agile Planning Poker process is repeated for each user story or
                task, allowing the team to estimate the entire backlog or sprint plan collaboratively.
              </Typography>
            </div>
          </Slide>
        </Grid>
      </Grid>
      <br />
      <br />
      <Grid container item sm={12} lg={9} justify='center' alignItems='center'>
        <Grid item sm={12} lg={6}>
          <Slide in={true} direction='up' timeout={2000}>
            <div className='HomePageContainer'>
              <Typography variant='h5'>Benefits of Agile Planning Poker</Typography>
              <br />
              <Typography variant='body1'>
                a. <b>Improved Accuracy</b>: Agile Planning Poker leverages the collective knowledge and expertise of
                the team, resulting in more accurate and reliable estimations. It considers different perspectives,
                experiences, and skill sets, leading to a well-rounded estimation process.
                <br />
                b. <b>Enhanced Collaboration</b>: The technique encourages open communication, discussion, and knowledge
                sharing among team members. It facilitates a shared understanding of the work, promotes a sense of
                ownership, and fosters a collaborative team culture.
                <br />
                c. <b>Increased Transparency</b>: Agile Planning Poker makes the estimation process transparent and
                visible to the entire team. This visibility helps identify discrepancies, resolve conflicts, and align
                expectations, ensuring better planning and decision-making.
                <br />
                d. <b>Time Efficiency</b>: The structured nature of Agile Planning Poker streamlines the estimation
                process. It prevents lengthy debates and reduces biases by anchoring individual estimations to a shared
                understanding, leading to quicker consensus building.
              </Typography>
            </div>
          </Slide>
        </Grid>
        <Grid item sm={12} lg={6}>
          <Slide in={true} direction='up' timeout={2000}>
            <div className='HomePageContainer'>
              <Box padding={2}>
                <img alt='Benefits' src={Benefits}></img>
              </Box>
            </div>
          </Slide>
        </Grid>
      </Grid>
      <br />
      <br />
      <Grid container item sm={12} lg={9} justify='center' alignItems='center'>
        <Grid item sm={12} lg={6}>
          <Slide in={true} direction='up' timeout={2000}>
            <div className='HomePageContainer'>
              <Box padding={2}>
                <img alt='BestPractices' src={BestPractices}></img>
              </Box>
            </div>
          </Slide>
        </Grid>
        <Grid item sm={12} lg={6}>
          <Slide in={true} direction='up' timeout={2000}>
            <div className='HomePageContainer'>
              <Typography variant='h5'>Best Practices for Agile Planning Poker</Typography>
              <br />
              <Typography variant='body1'>
                a. <b>Establish Consistent Estimation Units</b>: Ensure the team has a clear understanding and
                consistency in the units used for estimation, such as story points, ideal days, or t-shirt sizes.
                <br />
                b. <b>Include the Whole Team</b>: Involve all team members in Agile Planning Poker, as diverse
                perspectives lead to better estimations and improved buy-in.
                <br />
                c. <b>Use Fibonacci Sequence</b>: Consider utilizing the Fibonacci sequence (1, 2, 3, 5, 8, 13, 21,
                etc.) for assigning values to estimation cards. This helps account for the inherent uncertainty and
                diminishing accuracy of estimating larger tasks.
                <br />
                d. <b>Document and Track Estimations</b>: Maintain a record of estimated values to track progress,
                monitor trends and identify areas where adjustments may be necessary. This documentation provides
                valuable insights for future planning and retrospective analysis.
                <br />
                e. <b>Embrace Consensus</b>: Agile Planning Poker aims to achieve consensus within the team. Encourage
                open discussions, actively listen to different viewpoints, and work towards finding common ground to
                reach agreement on the estimation.
                <br />
                f. <b>Iterate and Refine</b>: Agile Planning Poker is not a one-time activity. Continuously refine and
                improve the estimation process based on feedback and lessons learned from previous sprints. Adapt the
                technique to suit the team's needs and evolving project requirements.
                <br />
                <br />
              </Typography>
            </div>
          </Slide>
        </Grid>
        <Typography>
          Agile Planning Poker is a powerful technique that enhances collaboration, transparency, and accuracy in the
          estimation process for Agile teams. By harnessing the collective knowledge and expertise of team members, it
          leads to more reliable estimations and better planning outcomes. Embracing Agile Planning Poker enables teams
          to effectively manage project scope, prioritize work, and deliver value to stakeholders with increased
          confidence. Incorporate this collaborative estimation technique into your Agile practices and experience the
          benefits of empowered teamwork and improved project success.
        </Typography>
      </Grid>
    </>
  );
};
