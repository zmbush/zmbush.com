---
title: Genetic Algorithm
image: genetic.png
snippet: |
  This was a project for the 2011 Facebook hackathon. The goal was to
  create a simulation involving multiple agents working towards a common goal
  of collecting enough food to survive to the next generation.
partners: [mary]
source-url: https://github.com/zmbush/genetic-algorithm
---
This project was aiming to create a simulation involving multiple agents all working towards
collecting enough food.

I created it with my partner {{ site.partners.mary.name }} during the 2011 Facebook hackathon. We
wrote the backend in Java, which controlled the agents as they moved around and collected food. We
wrote the frontend in python to give a graphical view of what was going on in the simulation.

We implemented several simple reaction agents to control the gatherer agents, and then we started to
work on adding predators. However we found it extremely difficult to have a stable population of
both gatherers and predators.

The reason, I believe, is that we simulated with a constant amount of grass every round,
but the number of gatherers would fluctuate. Also we worked only with discrete generations, which
limited the meaningfulness of our simulation.

The next steps would be to allow the algorithm to change itself. Also, we should change the grass to
be able to grow back, so there would hopefully be some equilibrium that maintains the populations of
both the predators and the gatherers.
