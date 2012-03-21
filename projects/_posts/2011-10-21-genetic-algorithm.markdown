---
layout: post
title: Genetic Algorithm
image: genetic.png
snippet: |
  This was a project for the 2011 Facebook hackathon. The goal was to
  create a simulation involving multiple agents working towards a common goal
  of collecting enough food to survive to the next generation. 
---
This project was aiming to create a simulation involving multiple agents all
working towards collecting enough food. 

It was started for the 2011 Facebook hackathon with my partner 
{{ site.partners.mary }}. The backend was written in java, which controlled the
agents as they moved around an collected food. The frontend was written in
python to give a graphical view of what was going on in the simulation. 

We implemented several simple reaction agents to control the gatherer agents,
and then we started to work on adding predators. However we found it extremely
difficult to have a stable population of both gatherers and predators.

The reason, I believe, is that we set up the simulation with a constant amount
of grass every round, but the number of gatherers would fluctuate. Also we
worked only with discrete generations, which limited the meaningfulness of our
simulation. 

The next steps would be to modify the algorithm to work on a continuous bansis.
Also, the grass should be able to grow back, so there would hopefull be some
equillibrium that maintains the populations of both the predators and the
gatherers. 

You can view the code for this project
[here](https://github.com/zipcodeman/genetic-algorithm)
