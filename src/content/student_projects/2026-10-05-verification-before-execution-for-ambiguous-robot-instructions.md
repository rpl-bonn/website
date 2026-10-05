---
title: Verification-Before-Execution for Ambiguous Robot Instructions
type: master thesis
visible: true
image: /verificaion-before-execution.png
---
Robots often receive ambiguous instructions in scenes with multiple possible objects, actions, or interpretations. For example, a command such as “pick up the tool” or “put it back” may be unclear if several objects or locations are possible.

In this project, we want to build a verification layer that checks the assumptions behind generated robot code or action plans before execution. The system should reason about the target object, spatial relations, affordances, and uncertainty, and decide whether the robot should execute the action, ask for clarification, observe the scene again, or stop safely.

The goal is to evaluate whether ambiguity and uncertainty checks can reduce incorrect robot actions compared to directly executing generated plans.

**Keywords:** language-conditioned robotics, code-as-policy, ambiguity, uncertainty, verification, safe robot execution.

**Related references:** [RoboCodeX](https://arxiv.org/pdf/2402.16117); [EmbodiedCoder](https://arxiv.org/pdf/2510.06207); [Navigation with LLMs](https://arxiv.org/pdf/2310.10103); [FAIL-Detect](https://arxiv.org/pdf/2503.08558); [COBRA-PPM](https://arxiv.org/pdf/2403.14488).

# Requirements
Experience with Python and PyTorch. Knowledge of robot planning, vision-language models, or basic robotics will help, but is not strictly required.

# Contact

Women, as well as other students who identify under the FLINTA* umbrella, are particularly encouraged to apply!

Please send your CV and transcript to [gsikarog@uni-bonn.de](mailto:gsikarog@uni-bonn.de) and [rmohiudd@uni-bonn.de](mailto:rmohiudd@uni-bonn.de)