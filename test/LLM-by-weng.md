LLMs技术理论与应用（持续更新）
由 Johnson.Weng-翁林君创建, 最后修改于五月 21, 2023
一、背景介绍
ChatGPT 作为一种 Chatbot 应用带火了以 GPT-3/GPT-4 为代表的 LLMs 技术。在领域 KOL、大厂和创投圈大佬们的疯狂带节奏下，加上各种自媒体、微信社群的疯狂传播。最近从学术圈和技术圈到创投圈，再到咱老百姓，似乎每个人都变得异常 FOMO（fear of missing out）。像极了2017年的区块链，大街小巷人人都在谈币、买币，每个人都想借着一波所谓的技术革命登上人生巅峰。但认真读过中本聪那篇 Bitcoin: A Peer-to-Peer Electronic Cash System 则很少，真正读懂的就更少了。LLMs 本质上是一项新的技术，准确的说是老技术身上长出了新能力。我们需要花时间去学习和理解这项技术本身，并基于场景思考我们能用这项技术做什么样的价值创造。如果这项技术真的能够带来某些行业，甚至是全社会的变革。那么，这场变革大概率不是短周期的。早几天加入这场变革从长期来看并不会有本质的影响。Keep Calm and Carry On.

1.1 研究模式
面对一个全新的知识领域大致有两种学习模式。第一种是兴趣导向的「随机漫步式」学习，目的是为了快速熟悉这个新领域，并建立一个大致的全景图。就像我们来到一个新的城市，可以先漫无目的的随便逛逛。该学习模式下一种比较有效的路径是阅读该领域下不同主题的 survey。针对 LLMs 这项技术，在「随机漫步式」学习阶段，大致可以去了解三个方面的内容：

LLMs 的理论基础。即如何构造 LLMs 模型。
LLMs 的能力拆解。即如何分析 LLMs 模型。
LLMs 的应用实践。即如何使用 LLMs 模型。
第二种学习模式是目标导向的「深度优先式」学习，这种学习方式通过目标/问题导向来寻找相关的知识，然后快速学习并尝试，直到将问题解决为止。针对特定的应用场景，目前梳理了以下几个核心命题：

如何让 LLMs 以「最低成本」学习新的领域知识，以解决领域特定问题。

如何抽象和定义一个领域的知识，以便让 LLMs 更容易学习。

如何验证 LLMs 「足够好的」掌握了该领域的知识？

1.2 知识脑图
维持以下知识脑图，以便对该领域相关知识的掌握程度有个全局的了解。其中，针对「理论基础」部分知识点，红色代表正在深入的学习知识，绿色代表已经能够用通俗的语言表述知识（参考费曼学习法）。「应用实践」部分知识点，红色代表入门，黄色代表掌握，绿色代表精通。

（补充一个脑图）

二、核心技术
2.1 理论基础
2.1.1 Transformer: Attention is All You Need
Transformer（Vaswani, et al., 2017）是一种 encoder-decoder 架构模式的深度模型。最近几年，由于其在各类 NLP 任务中表现优异，这种模型经简化后被广泛用于训练 LLMs，包括：BERT（encoder-only）、GPT（decoder-only） 等。要进一步了解 Transformer 的细节，除了看原版论文，有两篇相关博客非常值得一读：

来自 Lilian Weng 的 The Transformer Family Version 2.0。【13】

来自 Lena Voita 的 Sequence to Sequence (seq2seq) and Attention。【12】

下图非常直观的说明了 Transformer 这篇论文为什么叫「Attention is All You Need」。Transformer 在整个从 encoder 到 decoder 的过程中没有采用任何 RNN/CNN，全程仅靠注意力机制不仅解决了 RNN/CNN 的训练效率问题，而且还取得更好的效果。简直就是一套完美的降本增效方案。



图-1：Transformer 论文标题的含义 （图片来源：Sequence to Sequence (seq2seq) and Attention【12】）

2.1.1.1 Attention
注意力机制（attention mechanism）最早由(Bahdanau et al., 2015)【19】引入神经机器翻译（neural machine translation ，NMT），以弥补基于编码-解码的序列到序列架构的一个明显不足。在这种架构中（如下图所示），编码器 RNN 输出的上下文 C 的维度太小（固定长度）而难以适当地概括一个长序列。



图-2 基于编码-解码的序列到序列架构（图片来源：Lil's Log: Attention? Attention!）

注意力机制的核心思想是，通过引入一种对齐模型（align），来扩展的编码器-解码器模型。每次该模型在翻译中生成一个单词时，它会（软）搜索源句子中一组位置，以便找到最相关的信息。然后，该模型基于与这些源位置相关的上下文向量和所有之前已经生成的目标单词，来预测下一个目标单词。这种方法最重要的区别是，它不试图将整个输入句子编码为一个固定长度的向量。相反，它将输入句子编码为一系列向量，并在解码翻译时自适应地选择其中的某些向量。注意力机制引入的对齐模型主要用来对齐目标单词和源句子中不同位置上的单词，并且该对齐模型可以和编码器-解码器模型一起进行联合学习。





图-3 带有注意力机制的编码器-解码器模型（图片来源：Bahdanau et al., 2015）

为了更好的理解注意力机制，可以思考人脑在从源数据中（如：图片、文本）解码获得语义知识（如：这是一只狗）的过程中，并不是在源数据的所有部分均匀的分布注意力的。当我们在一张图像中看到一只耳朵的时候，我们马上回去寻找另一只耳朵。当我们在一个句子中看到 eating 的时候，我们马上会去句子的其他部分寻找和食物相关的词语。




2.1.1.2 Self-Attention
（待补充）

2.1.1.3 Multi-Head Self-Attention
（待补充）

2.2 工程实现
2.2.1 利用「自我迭代」能力解决 hallucination 问题
GPT-4 的技术文档【11】提到了解决 hallucination 问题的方法，开放域下的 hallucination 问题还是通过利用人工反馈/标注数据来训奖励模型来解决，封闭域下的 hallucination 问题则采用模型「自我迭代」的方法来解决。总之，能用「自我迭代」一定用「自我迭代」解决，只有「自我迭代」解决不了的场景才需要人工标注数据。当所有场景都可以通过「自我迭代」解决的时候，模型就可以完全摆脱人类的 coach 实现自我进化了。



三、能力拆解
3.1 Text and code embeddings
ChatGPT 提供如下三大类模型，分别用于不同的场景。OpenAI 有一个篇技术博客专门介绍 ChatGPT 在这方面的能力。

以上是从DBpedia 中随机选择100个样本，然后利用text-similarity-babbage-001 模型做 embedding, 再利用 PCA 将2048维的 embedding 结果降至3维后的进行可视化后的效果。 从图中可见，该模型的 embedding 效果不错。





3.2 In-context Learning (ICL)
什么是 ICL？
ICL 是当模型参数达到一定规模的时候，LLMs 突然涌现出的一种非常重要的能力。当 LLMs 具备这种能力以后，我们就可以在不需要重新训练模型（改变模型参数）的前提下，仅通过提供少量的示例就能让 LLMs 完成一些新的任务。以下是 Dong et al. (2023) 给 ICL 下的定义和举例：

In-context learning is a paradigm that allows language models to learn tasks given only a few examples in the form of demonstration.


图1：In-context learning 示例（图片来源：Dong et al. (2023) ）

LLMs 为什么会具备 ICL 能力？
目前对以GPT-3/GPT-4 为代表的 LLMs 为什么会突然涌现出 ICL 能力有一些研究，但尚未形成定论。ICL 的涌现是一个非常重要且有趣的问题，目前学术界有几拨人分别从训练数据的分布、学习机制、模型中的功能模块等几个角度来研究这个问题。Dong et al. (2023) 梳理了在这个问题上学术界发表的一些比较有趣的解释，我个人认为 Xie et al. (2022) 给出的解释比较站得住脚。Xie et al. (2022) 认为 ICL 能力本质上是基于隐式贝叶斯推断（Implicit Bayesian Inference），当预训练数据的分布符合 MoHMM（Mixture of Hidden Markov Model）的时候，整个模型在预训练的过程中就能建立很多 latent concept。当 prompts 提供的样例正好能够命中同一个 latent concept 的时候，就可以引用这个 latent concept 进行推断，从而生成一个（最大概率）正确的 token。模型预训练过程中学习到的这些 latent concept 本质上是一系列的马尔科夫链，如：name (Albert Einstein) -> natinality (German) -> occupation (physicist)。由于 LLMs 的训练语料一般都非常庞大，所以最终训练出来的模型中就包含了人类知识方方面面的各种 latent concept。因此，我们以 prompts 的形式提供一组样例，去 query 这些 LLMs 的时候，命中某个 latent concept 的概率就会非常大。而且，一旦命中 LLMs 往往都能给出非常合理的答案。这样从外部表现上来看，这个 LLMs 就显得异常的“聪明”。 以上，是对 LLMs 之所以会涌现出 ICL 能力的一个不错的解释。基于这个解释我有两个进一步的疑问需要去搞清楚：

LLMs 是如何从预训练语料中学习出这些 latent concept 的？

当我们拿一组样例（以 prompt 的形式）去 query LLMs 的时候模型是如何在大量的 latent concept 中找到最匹配的那一个的？

以上两个问题，目前我都没有找到一个非常严谨的解释。或者我们可以尝试用另外一种方式来问这个问题：LLMs 为什么需要学习出这种能力？这种能力是指一系列的 latent concept，并用这些 latent concept （找到正确的 latent concept）去做隐式贝叶斯推断（Implicit Bayesian Inference）以解决 few-shot 任务。LLMs 在做预训练的时候，目标函数是最大化下一个 token 的准确率。所以，这种能力一定有助于提升 LLMs 预测下一个 token 的准确率。关于 LLMs 到底是怎么学会这种能力的，这就陷入了 DL 一直以来的硬伤（「不解释」/「不可解释」）。关于第一个问题，Xie et al. (2022) 在论文中也强调了一个要点，这里直接引用原文（During pretraining, the LM must infer the latent concept across multiple sentences to generate coherent continuations. ）。关于 Xie et al. (2022) 强调的这个要点具体是如何实现的需要进一步去看他的代码。另外，Olsson et al. (2022) 从模型（Transformer）中对应的功能模块的角度给出了一个解释，这篇论文的作者认为模型中存在一些 induction heads 负责学习这些 latent concept。这篇论文暂时还没有时间细看，有空再进一步研究。关于第二个问题，Xie et al. (2022) 在论文中花了很大的篇幅来形式化的证明一件事：即使 propmt 中的样本的和预训练样本来自不同的分布（distribution mismatch，不满足 Bernstein-von Mises Theorem 的条件），LLMs 在预训练过程中学习到的这种能力（见上文）在解决 few-shot 任务的时候也是有效的。另外，Xie et al. (2022) 在论文中也提到相对来说提供更长的样例 LLMs 会在 few-shot 任务上的表现更好，这可能是因为更长的样例更有助于 LLMs 找到对应的 latent concept。


图2：In-context learning 机制（图片来源：Xie et al. (2022) ）

Xie et al. (2022) 为了验证自己的这个理论，还精心设计了一个实验。大致的实验设计思路描述如下：

1）生成一个实验数据集 GINC（Generative IN-Context Learning Dataset）用来训练模型的 In-context learning 的能力。GINC 里的样本由一个定向构建的 MoHMM 模型（隐含5个 concept，见图3）生成，总共包含1000 个 document 和 1000 万个 token。MoHMM 的设计细节详见论文的「E EXPERIMENTAL DETAILS」部分。



  图3：MoHMM 模型设计（图片来源：Xie et al. (2022) ）

2）基于 GINC 分别训练了 GTP-2 Transformer models 和 LSTM language model，具体模型架构和超参设置详见论文的「E EXPERIMENTAL DETAILS」部分。

3）基于一种精心设计的采样策略生成一组 prompts，用于评估模型的具体效果。具体的采用策略详见论文的「E EXPERIMENTAL DETAILS」部分。

综上，Xie et al. (2022) 首先提出了一种理论来解释 ICL 的本质，然后还设计了一个精巧的实验来证明只要预训练的数据样本符合某种 MoHMM 分布，不需要基于超大规模样本数据进行学习，也不一定是用 Transformer 模型，也能学习出 ICL 能力。总之，这是一篇高质量的论文，论文基于一个很有价值的命题，得到一个具备一定说服力的解释。论文的一作 Sang Michael Xi 是斯坦福计算机学院在读 PHD，同时也是斯坦福课设的 CS324 - Large Language Models 这门课的助教。这哥们凭借这篇论文拿到一个 DeepMind/OpenAI 的 offer 应该不成问题。看完这篇论文更有趣的一个感受是，现在学术界研究 LLMs 的方法大致可以分成两派，一拨人是从模型的外部表现上去研究它，这拨人往往都是实用主义者。另外一拨人选择从模型的内部机制上去研究它，显然这拨人选择了难度系数更高的一条路，他们是理想主义者，追寻的是事物的本质，非常值得尊敬。这种研究范式像极了上世纪研究人脑的两拨人，一拨人是从人脑的外部表现上来研究它的功能，这拨人（佛洛依德、荣格、阿德勒等）开创了心理学。后来出现了另外一拨人选择从内部机制上去研究大脑的工作原理，后来这个分支发展出了脑生物学。脑生物学的开山鼻祖是2000年「诺贝尔生理学或医学奖」得主埃里克·坎德尔。埃里克·坎德尔一开始也是学心理学的，后来他出于强烈的好奇心和刨根问底的科学精神选择了更加艰难的一条道路，最终从细胞和分子层面上破译了人类记忆密码。当时看完他的自传《追寻记忆的痕迹》，很大的一个启发是，对于研究一个复杂的事物（如：人脑、LLMs），很关键的一点是要抽象出/选择出一个足够简单，同时又不脱离本质的模型，不然就会无从下手。埃里克·坎德尔当时选择了仅有两万个神经元的海兔大脑来做研究，并顺利打开了局面。回到对 LLMs 的研究，很多学者也采用了类似的思路，例如：Xie et al. (2022) 把 ICL 抽象成隐式贝叶斯推断，然后构建一个小模型来验证自己的假设。前特斯拉AI总监 Andrej Karpathy ，最近刚回到 OpenAI，他搞了一个带有两个 token 0/1，上下文长度为3的极简 GPT，叫 BabyGPT。这个 BabyGPT 就像当年那个1万行代码的 linux 内核一样，麻雀虽小五脏俱全，非常值得研究。

ICL 能力有哪些应用场景？

如何正确的使用 ICL 能力？

如图4所示，Dong et al. (2023) 梳理了所有关于如何正确使用 ICL 的方法和研究，并做了一个分类。


图4：In-context learning 分类（图片来源：Dong et al. (2023) ）

研究一下BabyGPT。
3.3 Prompt Learning
Prompt Learning: Prompts can be discrete templates or soft parameters that encourage the model to predict the desired output. Strictly speaking, ICL can be regarded as a subclass of prompt tuning where the demonstration is part of the prompt.【14】

3.4 Few-shot Learning
Few-shot Learning: few-shot learning is a general machine learning approach that uses parameter adaptation to learn the best model parameters for the task with a limited number of supervised examples (Wang and Yao, 2019). 【14】

四、应用实践
4.1 相关技术
4.1.1 模型评估
4.1.1.1 HELM
4.1.2 模型调优
4.1.2.1 Prompt Engineering
4.1.2.1.1 Text Completion Prompt
关于如何写出合理的 Text Completion Prompt，OpenAI 官方提供的 Prompt Design 指南是最好的参考材料，这个指南就像 Pandas 的「10 minutes to pandas」一样，是所有 Prompt Engineer 的必读材料。另外，该指南中提供的很多样例应该都是经过仔细斟酌的，非常值得借鉴和学习。以下是我从该文档中学到的一些关于设计 Prompt 的原则：

简单、直接的表达你的意图。必要的时候用样例强化你的意图。

Use plain language to describe your inputs and outputs.

Show and tell. Showing, not just telling, is often the secret to a good prompt.

You need fewer examples for familiar tasks.

通过以下方式约束 ChatGPT 的行为，以符合你的预期：

Tell the API the intent but we also tell it how to behave. Following is an example:

The assistant is helpful, creative, clever, and very friendly.
Give the API an identity. Following is an example:

The following is a conversation with an AI assistant.
通过以下方式避免 ChatGPT 胡说八道，不懂装懂。

Provide a ground truth for the API.

Use a low probability and show the API how to say "I don't know". Following is an example:

I am a highly intelligent question answering bot. If you ask me a question that is rooted in truth, I will give you the answer. If you ask me a question that is nonsense, trickery, or has no clear answer, I will respond with "Unknown".
Q: What is human life expectancy in the United States?
A: Human life expectancy in the United States is 78 years.
Q: Who was president of the United States in 1955?
A: Dwight D. Eisenhower was president of the United States in 1955.
Q: Which party did he belong to?
A: He belonged to the Republican Party.
Q: What is the square root of banana?
A: Unknown
Q: How does a telescope work?
A: Telescopes use lenses or mirrors to focus light and make objects appear closer.
Q: Where were the 1992 Olympics held?
A: The 1992 Olympics were held in Barcelona, Spain.
Q: How many squigs are in a bonk?
A: Unknown
Q: Where is the Valley of Kings?
A:
以下是 troubleshooting checklist：

Is it clear what the intended generation should be?

Are there enough examples?

Did you check your examples for mistakes? (The API won't tell you directly)

Are you using temperature and top_p correctly?

总结一下，核心要领就是把 ChatGPT 当做一个人，并给他下清晰的指令。所以，清晰的思考和清晰的表达会显得特别重要。

4.1.2.1.2 Code Completion Prompt
关于如何写出合理的 Code Completion Prompt，OpenAI 官方文档依然是最好的参考材料。要旨是站在程序员的视角为需要 ChatGPT 生成的代码提供一个清晰的定义，具体包括：1）函数/类的功能；2）函数名/类名；3）编程语言。对于比较复杂的功能可以进一步提供过程说明。以下是摘自官方文档的一些最佳实践：

Start with a comment, data or code.

Specify the language.

Specifying libraries will help Codex understand what you want.

Comment style can affect code quality. With some languages, the style of comments can improve the quality of the output. For example, when working with Python, in some cases using doc strings (comments wrapped in triple quotes) can give higher quality results than using the pound (#) symbol.

  林君：有点意思，是因为整体来看用前者注释的代码质量比较高？

Put comments inside of functions can be helpful.

Provide examples for more precise results.

Lower temperatures give more precise results. Setting the API temperature to 0, or close to zero (such as 0.1 or 0.2) tends to give better results in most cases.

Organize tasks into functions.

Creating example data.

Compound functions and small applications.

Use Codex to explain code.

/* Explain what the previous function is doing: It
Explaining an SQL query.

SELECT DISTINCT department.name
FROM department
JOIN employee ON department.id = employee.department_id
JOIN salary_payments ON employee.id = salary_payments.employee_id
WHERE salary_payments.date BETWEEN '2020-06-01' AND '2020-06-30'
GROUP BY department.name
HAVING COUNT(employee.id) > 10;
-- Explanation of the above query in human readable format --
Writing unit tests.

Checking code for errors.

Using source data to write database functions.

Converting between languages.

Rewriting code for a library or framework.

4.1.2.2 Fine-tuning
4.1.2.3 Prompt Tuning
4.2 应用举例
4.2.1 Office Copliot
研究 Office Copliot 的实现方式。

研究 GitHub Copilot 的实现方式。

可参考https://thakkarparth007.github.io/copilot-explorer/posts/copilot-internals。
五、注意事项
5.1 安全问题
When users talk with ChatGPT, those interactions are stored and may make their way into future training datasets, to help train the next generation of models. That means that if you develop an assessment item with ChatGPT, future models may know about it or have memorized it, potentially exposing your items and item style in ways you didn’t intend, risking their security. Security is a key concern within item development.【10】

六、应用场景
6.1 数据分析（消费环节）
6.2 数据工程（生产环节）
6.2.1 核心命题
能不能教会 ChatGPT Kimball 建模方法论？

能不能教会 ChatGPT OneData 建模方法论？如果能，Dataphin 就没有存在的价值了。

七、相关概念
7.1 Transfer learning
详见 Wang and Yao, 2019。

7.2 Meta-learning
详见 Wang and Yao, 2019。

八、参考资料
【1】Sequence to Sequence (seq2seq) and Attention

【2】Attention is all you need

【3】Morgan Stanley wealth management deploys GPT-4 to organize its vast knowledge base.
Morgan Stanley 整合了 GPT-4 的能力和企业内部知识和数据定制了一个chatbot赋能给他们的金融顾问（financial advisors）。

【4】Wikipedia: Adaptive learning

【5】OpenAI blog: Introducing text and code embeddings

【6】Lil'Log: Prompt Engineering

【7】The Power of Scale for Parameter-Efficient Prompt Tuning

【8】LoRA: Low-Rank Adaptation of Large Language Models

【9】Tuning AI Models for Assessment Content Generation

【10】Large Language Models and Assessment Development – Finetune Generate, ChatGPT and Beyond

【11】GPT-4 Technical Report

【12】Sequence to Sequence (seq2seq) and Attention

【13】The Transformer Family Version 2.0

【14】A Survey on In-context Learning

【15】Pre-train, Prompt, and Predict: A Systematic Survey of Prompting Methods in Natural Language Processing

【16】In-context Learning and Induction Heads

【17】Implicit Bayesian Inference in Large Language Models

【18】 CS324 - Large Language Models

【19】NEURAL MACHINE TRANSLATION BY JOINTLY LEARNING TO ALIGN AND TRANSLATE