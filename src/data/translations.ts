export type Language = 'en' | 'ja' | 'zh';

export interface Translations {
  hero: {
    greeting: string;
    subtitle: string;
    description: string;
    viewWork: string;
    downloadResume: string;
  };
  nav: {
    about: string;
    skills: string;
    projects: string;
    career: string;
    demos: string;
    contact: string;
    getInTouch: string;
  };
  about: {
    title: string;
    heading: string;
    paragraph1: string;
    paragraph2: string;
    currentEducation: string;
    previousDegree: string;
  };
  skills: {
    title: string;
  };
  projects: {
    title: string;
    github: string;
    liveDemo: string;
    items: {
      shopu: { title: string; description: string };
      oldbailey: { title: string; description: string };
      aiExtension: { title: string; description: string };
      fidelityPdf: { title: string; description: string };
    };
  };
  career: {
    title: string;
    current: string;
    keyAchievements: string;
    technologiesUsed: string;
    items: {
      adobeReturning: {
        position: string;
        description: string;
        achievements: string[];
      };
      adobe: {
        position: string;
        description: string;
        achievements: string[];
      };
      fidelity: {
        position: string;
        description: string;
        achievements: string[];
      };
      tongues: {
        position: string;
        description: string;
        achievements: string[];
      };
    };
  };
  footer: {
    letsConnect: string;
    description: string;
    downloadResume: string;
    copyright: string;
    builtWith: string;
  };
  contact: {
    sendMessage: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    subjectPlaceholder: string;
    messagePlaceholder: string;
    sendButton: string;
    sending: string;
    successMessage: string;
    errorMessage: string;
    orReachOut: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    hero: {
      greeting: "Hi, I'm",
      subtitle: "2nd-Year MSE Computer Science Student | Software Engineer | AI & Software Enthusiast",
      description: "Second-year MSE student at the University of Pennsylvania with experience at Adobe and Fidelity. Passionate about AI, Machine Learning, FinTech, and Full-Stack Development.",
      viewWork: "View My Work",
      downloadResume: "Download Resume"
    },
    nav: {
      about: "About",
      skills: "Skills",
      projects: "Projects",
      career: "Career",
      demos: "Demos",
      contact: "Contact",
      getInTouch: "Get In Touch"
    },
    about: {
      title: "About Me",
      heading: "Second-Year Computer Science Graduate Student & Software Engineer",
      paragraph1: "Hi, I'm Andrew, a second-year Computer Science graduate student at the University of Pennsylvania, pursuing my MSE in Computer and Information Science. I completed my BS in Computer Science (Honors) at the University of Utah with a 3.81 GPA and Dean's List recognition.",
      paragraph2: "With experience at top companies like Adobe and Fidelity Investments, I've worked on everything from React Native mobile experiences and LLM-powered voice agents to AI-powered browser extensions with patent-pending features. I'm passionate about AI, Machine Learning, FinTech, and Full-Stack Development.",
      currentEducation: "Current Education",
      previousDegree: "Previous Degree"
    },
    skills: {
      title: "Skills & Technologies"
    },
    projects: {
      title: "Featured Projects",
      github: "GitHub",
      liveDemo: "Live Demo",
      items: {
        shopu: {
          title: "ShopU",
          description: "Senior capstone: built a full-stack social commerce platform for college students in a five-person Agile team, delivering an end-to-end MVP tested with 8 early pilot users. Developed an ML-based ranking algorithm using TF-IDF and boosting, improving precision and recall over a chronological baseline to better surface listings matching user interests."
        },
        oldbailey: {
          title: "OldBaileyProject",
          description: "Developed multiple classifiers (ID3, Perceptron, SVM, Logistic Regression) for court trial data analysis. Achieved 75% accuracy in Kaggle competition on predicting guilty/not guilty verdicts using scikit-learn and advanced machine learning techniques."
        },
        aiExtension: {
          title: "AI-Powered Browser Extension",
          description: "Feature-rich Chrome Extension prototype developed at Adobe using Vite + React that summarizes page content in real-time and incorporates a unique, patent-pending feature for enhanced context awareness with LLM integration."
        },
        fidelityPdf: {
          title: "Fidelity PDF Automation",
          description: "Web app demo built at Fidelity using JavaScript, Angular, HTML, and Fidelity UI components. Implemented fillable PDF functionality using pdf.js and ngx-extended-pdf-viewer, projected to save millions annually by reducing manual paperwork."
        }
      }
    },
    career: {
      title: "Career & Experience",
      current: "Current",
      keyAchievements: "Key Achievements:",
      technologiesUsed: "Technologies Used:",
      items: {
        adobeReturning: {
          position: "Returning Software Engineer Intern",
          description: "Delivered a React Native mobile experience for one of Adobe's enterprise AI products, integrating 3 backend data sources into a unified feed to proactively surface relevant, user-configurable alerts to customers. Developed a new voice agent worker integrating speech-to-text, LLM-powered workflows, and text-to-speech in partnership with the infrastructure-owning team.",
          achievements: [
            "Delivered a React Native mobile experience surfacing proactive, user-configurable alerts from 3 unified backend data sources",
            "Developed a new voice agent worker modeled on an existing implementation, saving an estimated 3 weeks of setup",
            "Earned a live demonstration to senior leadership (multiple VPs)",
            "Accelerated personal development velocity by nearly 2x using Claude, Claude Skills, and MCP for codebase exploration, debugging, and implementation"
          ]
        },
        adobe: {
          position: "Software Engineer Intern",
          description: "Developed an AI-powered Chrome Extension using React and Vite that summarized webpage content in real time through LLM-powered contextual analysis; core functionality was later featured at Adobe Summit. Collaborated with 10+ stakeholders, including designers, product managers, and engineers, to deliver a feature-complete MVP for internal evaluation.",
          achievements: [
            "Built an AI-powered Chrome Extension with real-time, LLM-powered webpage summarization",
            "Core functionality later featured at Adobe Summit (U.S. patent application filed May 2026)",
            "Collaborated with 10+ stakeholders across design, product, and engineering",
            "Delivered a feature-complete MVP for internal evaluation and future product exploration"
          ]
        },
        fidelity: {
          position: "Full Stack Software Engineer Intern",
          description: "Built an internal web application using Angular, JavaScript, HTML, and Fidelity UI components to modernize enterprise document workflows, connecting to product APIs via HTTPClient.",
          achievements: [
            "Built an internal web application with Angular, JavaScript, HTML, and Fidelity UI components",
            "Modernized enterprise document workflows, connecting to product APIs via HTTPClient",
            "Developed a solution projected to save millions annually by reducing manual paperwork and operational overhead",
            "Presented the project to senior leadership"
          ]
        },
        tongues: {
          position: "Lead Backend Developer",
          description: "Led migration from MongoDB to MySQL, improving query performance and reliability. Redesigned backend architecture to support scalability and led roadmap planning for future capabilities.",
          achievements: [
            "Led migration from MongoDB to MySQL, improving query performance and reliability",
            "Redesigned backend architecture to support scalability",
            "Led roadmap planning for future capabilities",
            "Provided technical guidance and recommendations directly to company leadership"
          ]
        }
      }
    },
    footer: {
      letsConnect: "Let's Connect!",
      description: "I'm always interested in new opportunities, collaborations, and interesting projects. Feel free to reach out if you'd like to work together or just have a chat about technology!",
      downloadResume: "Download Resume",
      copyright: "© {year} Andrew Bergenthal. All rights reserved.",
      builtWith: "Built with React, TypeScript, and Framer Motion"
    },
    contact: {
      sendMessage: "Send me a message",
      name: "Name *",
      email: "Email *",
      subject: "Subject",
      message: "Message *",
      namePlaceholder: "Your name",
      emailPlaceholder: "your.email@example.com",
      subjectPlaceholder: "What's this about?",
      messagePlaceholder: "Tell me about your project, opportunity, or just say hello!",
      sendButton: "Send Message",
      sending: "Opening Email...",
      successMessage: "✅ Your email client should open with the message ready to send!",
      errorMessage: "❌ Something went wrong. Please try again or email me directly.",
      orReachOut: "Or reach out directly:"
    }
  },
  ja: {
    hero: {
      greeting: "こんにちは、私は",
      subtitle: "MSEコンピュータサイエンス2年次学生 | ソフトウェアエンジニア | AI・ソフトウェア愛好家",
      description: "ペンシルベニア大学のMSE2年次の大学院生で、AdobeとFidelityでの経験があります。AI、機械学習、FinTech、フルスタック開発に情熱を持っています。",
      viewWork: "作品を見る",
      downloadResume: "履歴書をダウンロード"
    },
    nav: {
      about: "自己紹介",
      skills: "スキル",
      projects: "プロジェクト",
      career: "キャリア",
      demos: "デモ",
      contact: "連絡先",
      getInTouch: "お問い合わせ"
    },
    about: {
      title: "自己紹介",
      heading: "コンピュータサイエンス大学院2年次生 & ソフトウェアエンジニア",
      paragraph1: "こんにちは、私はアンドリューです。ペンシルベニア大学でコンピュータサイエンスの大学院2年次生として、コンピュータ・情報科学のMSEを追求しています。ユタ大学でコンピュータサイエンスの学士号（優等）を3.81のGPAと学部長表彰を受けて修了しました。",
      paragraph2: "AdobeやFidelity Investmentsなどのトップ企業での経験を持ち、React Nativeのモバイル体験やLLMを活用したボイスエージェントから、特許出願中の機能を備えたAI搭載ブラウザ拡張機能まで、幅広く取り組んできました。AI、機械学習、FinTech、フルスタック開発に情熱を持っています。",
      currentEducation: "現在の教育",
      previousDegree: "以前の学位"
    },
    skills: {
      title: "スキル & テクノロジー"
    },
    projects: {
      title: "注目のプロジェクト",
      github: "GitHub",
      liveDemo: "ライブデモ",
      items: {
        shopu: {
          title: "ShopU",
          description: "卒業制作：5人のアジャイルチームで大学生向けのフルスタックソーシャルコマースプラットフォームを構築し、8名の初期パイロットユーザーでテストしたエンドツーエンドのMVPを提供。TF-IDFとboostingを用いたMLベースのランキングアルゴリズムを開発し、時系列ベースラインに対して適合率と再現率を改善して、ユーザーの興味に合った出品をより適切に表示しました。"
        },
        oldbailey: {
          title: "OldBaileyProject",
          description: "裁判データ分析のための複数の分類器（ID3、パーセプトロン、SVM、ロジスティック回帰）を開発。scikit-learnと高度な機械学習技術を使用して、有罪/無罪の判決を予測するKaggleコンペティションで75%の精度を達成しました。"
        },
        aiExtension: {
          title: "AI搭載ブラウザ拡張機能",
          description: "Adobeで開発されたVite + Reactを使用した機能豊富なChrome拡張機能プロトタイプで、ページコンテンツをリアルタイムで要約し、LLM統合による強化されたコンテキスト認識のための独自の特許出願中の機能を組み込んでいます。"
        },
        fidelityPdf: {
          title: "Fidelity PDF自動化",
          description: "JavaScript、Angular、HTML、およびFidelity UIコンポーネントを使用してFidelityで構築されたWebアプリデモ。pdf.jsとngx-extended-pdf-viewerを使用して記入可能なPDF機能を実装し、手動の書類作業を削減することで年間数百万ドルを節約すると予測されています。"
        }
      }
    },
    career: {
      title: "キャリア & 経験",
      current: "現在",
      keyAchievements: "主な成果:",
      technologiesUsed: "使用技術:",
      items: {
        adobeReturning: {
          position: "復帰ソフトウェアエンジニアインターン",
          description: "AdobeのエンタープライズAI製品の一つ向けにReact Nativeのモバイル体験を提供し、3つのバックエンドデータソースを統一フィードに統合して、関連性が高くユーザーが設定可能なアラートを積極的に顧客へ提示。インフラを所有するチームと連携し、音声認識、LLMを活用したワークフロー、音声合成を統合した新しいボイスエージェントワーカーを開発しました。",
          achievements: [
            "3つの統合バックエンドデータソースから、ユーザー設定可能なアラートを積極的に提示するReact Nativeモバイル体験を提供",
            "既存実装をモデルにした新しいボイスエージェントワーカーを開発し、約3週間のセットアップを節約",
            "上級リーダーシップ（複数のVP）へのライブデモを実施",
            "Claude、Claude Skills、MCPを活用し、コードベースの調査・デバッグ・実装で個人の開発速度を約2倍に向上"
          ]
        },
        adobe: {
          position: "ソフトウェアエンジニアインターン",
          description: "ReactとViteを使用してAIを活用したChrome拡張機能を開発し、LLMによる文脈解析でウェブページの内容をリアルタイムに要約。中核機能は後にAdobe Summitで紹介されました。デザイナー、プロダクトマネージャー、エンジニアを含む10名以上のステークホルダーと協力し、内部評価用の機能完全なMVPを提供しました。",
          achievements: [
            "LLMを活用したウェブページのリアルタイム要約を備えたAI搭載Chrome拡張機能を構築",
            "中核機能は後にAdobe Summitで紹介（米国特許出願、2026年5月出願）",
            "デザイン、プロダクト、エンジニアリングにまたがる10名以上のステークホルダーと協力",
            "内部評価および将来の製品検討のための機能完全なMVPを提供"
          ]
        },
        fidelity: {
          position: "フルスタックソフトウェアエンジニアインターン",
          description: "Angular、JavaScript、HTML、Fidelity UIコンポーネントを使用して社内Webアプリケーションを構築し、エンタープライズの文書ワークフローを近代化。HTTPClient経由で製品APIに接続しました。",
          achievements: [
            "Angular、JavaScript、HTML、Fidelity UIコンポーネントで社内Webアプリケーションを構築",
            "エンタープライズの文書ワークフローを近代化し、HTTPClient経由で製品APIに接続",
            "手作業の書類作業と運用負荷を削減し、年間数百万ドルの節約が見込まれるソリューションを開発",
            "プロジェクトを上級リーダーシップに発表"
          ]
        },
        tongues: {
          position: "リードバックエンド開発者",
          description: "MongoDBからMySQLへの移行を主導し、クエリパフォーマンスと信頼性を向上。スケーラビリティをサポートするためにバックエンドアーキテクチャを再設計し、将来の機能のためのロードマップ計画を主導しました。",
          achievements: [
            "MongoDBからMySQLへの移行を主導し、クエリパフォーマンスと信頼性を向上",
            "スケーラビリティをサポートするためにバックエンドアーキテクチャを再設計",
            "将来の機能のためのロードマップ計画を主導",
            "会社のリーダーシップに直接技術的なガイダンスと推奨事項を提供"
          ]
        }
      }
    },
    footer: {
      letsConnect: "お問い合わせ！",
      description: "新しい機会、コラボレーション、興味深いプロジェクトに常に関心があります。一緒に働きたい、または技術について話したい場合は、お気軽にご連絡ください！",
      downloadResume: "履歴書をダウンロード",
      copyright: "© {year} アンドリュー・バーゲンタール。全著作権所有。",
      builtWith: "React、TypeScript、Framer Motionで構築"
    },
    contact: {
      sendMessage: "メッセージを送信",
      name: "名前 *",
      email: "メールアドレス *",
      subject: "件名",
      message: "メッセージ *",
      namePlaceholder: "お名前",
      emailPlaceholder: "your.email@example.com",
      subjectPlaceholder: "件名を入力",
      messagePlaceholder: "プロジェクト、機会について、または挨拶をお聞かせください！",
      sendButton: "メッセージを送信",
      sending: "メールを開いています...",
      successMessage: "✅ メールクライアントが開き、メッセージの準備ができているはずです！",
      errorMessage: "❌ 問題が発生しました。もう一度お試しいただくか、直接メールをお送りください。",
      orReachOut: "または直接連絡："
    }
  },
  zh: {
    hero: {
      greeting: "你好，我是",
      subtitle: "MSE计算机科学二年级学生 | 软件工程师 | AI和软件爱好者",
      description: "宾夕法尼亚大学MSE二年级研究生，在Adobe和Fidelity有工作经验。对AI、机器学习、金融科技和全栈开发充满热情。",
      viewWork: "查看我的作品",
      downloadResume: "下载简历"
    },
    nav: {
      about: "关于我",
      skills: "技能",
      projects: "项目",
      career: "职业",
      demos: "演示",
      contact: "联系方式",
      getInTouch: "联系我"
    },
    about: {
      title: "关于我",
      heading: "计算机科学研究生二年级 & 软件工程师",
      paragraph1: "你好，我是安德鲁，宾夕法尼亚大学计算机科学研究生二年级学生，正在攻读计算机与信息科学硕士学位。我在犹他大学完成了计算机科学学士学位（荣誉），GPA为3.81，并获得院长名单认可。",
      paragraph2: "在Adobe和富达投资等顶级公司拥有工作经验，我从React Native移动体验、LLM驱动的语音代理，到具有专利申请功能的AI驱动浏览器扩展，涉猎广泛。我对AI、机器学习、金融科技和全栈开发充满热情。",
      currentEducation: "当前教育",
      previousDegree: "之前的学位"
    },
    skills: {
      title: "技能与技术"
    },
    projects: {
      title: "精选项目",
      github: "GitHub",
      liveDemo: "在线演示",
      items: {
        shopu: {
          title: "ShopU",
          description: "高级毕业设计：在五人敏捷团队中为大学生构建了全栈社交商务平台，交付了由8名早期试点用户测试的端到端MVP。开发了使用TF-IDF和boosting的基于机器学习的排名算法，相对于按时间排序的基线提高了精确率和召回率，从而更好地呈现符合用户兴趣的商品。"
        },
        oldbailey: {
          title: "OldBaileyProject",
          description: "为法庭审判数据分析开发了多个分类器（ID3、感知器、SVM、逻辑回归）。使用scikit-learn和先进的机器学习技术，在Kaggle竞赛中预测有罪/无罪判决的准确率达到75%。"
        },
        aiExtension: {
          title: "AI驱动的浏览器扩展",
          description: "在Adobe使用Vite + React开发的功能丰富的Chrome扩展原型，可实时总结页面内容，并集成了独特的专利申请功能，通过LLM集成增强上下文感知能力。"
        },
        fidelityPdf: {
          title: "富达PDF自动化",
          description: "在富达使用JavaScript、Angular、HTML和富达UI组件构建的Web应用演示。使用pdf.js和ngx-extended-pdf-viewer实现了可填写PDF功能，预计通过减少手动文书工作每年可节省数百万美元。"
        }
      }
    },
    career: {
      title: "职业与经验",
      current: "当前",
      keyAchievements: "主要成就：",
      technologiesUsed: "使用的技术：",
      items: {
        adobeReturning: {
          position: "回归软件工程师实习生",
          description: "为Adobe的一款企业级AI产品交付了React Native移动体验，将3个后端数据源整合为统一信息流，主动向客户呈现相关且可由用户配置的提醒。与拥有基础设施的团队合作，开发了集成语音识别、LLM驱动工作流和语音合成的全新语音代理worker。",
          achievements: [
            "交付React Native移动体验，从3个统一的后端数据源主动呈现可由用户配置的提醒",
            "开发了以现有实现为模型的全新语音代理worker，节省约3周的搭建时间",
            "向高级领导层（多位VP）进行了现场演示",
            "利用Claude、Claude Skills和MCP进行代码库探索、调试和实现，将个人开发速度提升近2倍"
          ]
        },
        adobe: {
          position: "软件工程师实习生",
          description: "使用React和Vite开发了一个AI驱动的Chrome扩展，通过LLM驱动的上下文分析实时总结网页内容；核心功能后来在Adobe Summit上展示。与包括设计师、产品经理和工程师在内的10多名利益相关者合作，交付了用于内部评估的功能完整MVP。",
          achievements: [
            "构建了具有实时、LLM驱动网页摘要功能的AI驱动Chrome扩展",
            "核心功能后来在Adobe Summit上展示（美国专利申请于2026年5月提交）",
            "与设计、产品和工程领域的10多名利益相关者合作",
            "交付用于内部评估和未来产品探索的功能完整MVP"
          ]
        },
        fidelity: {
          position: "全栈软件工程师实习生",
          description: "使用Angular、JavaScript、HTML和富达UI组件构建了内部Web应用，以现代化企业文档工作流，并通过HTTPClient连接到产品API。",
          achievements: [
            "使用Angular、JavaScript、HTML和富达UI组件构建了内部Web应用",
            "现代化企业文档工作流，并通过HTTPClient连接到产品API",
            "开发的解决方案预计通过减少手动文书工作和运营开销每年可节省数百万美元",
            "向高级领导层展示了该项目"
          ]
        },
        tongues: {
          position: "后端开发负责人",
          description: "主导了从MongoDB到MySQL的迁移，提高了查询性能和可靠性。重新设计了后端架构以支持可扩展性，并主导了未来功能的路线图规划。",
          achievements: [
            "主导了从MongoDB到MySQL的迁移，提高了查询性能和可靠性",
            "重新设计了后端架构以支持可扩展性",
            "主导了未来功能的路线图规划",
            "直接向公司领导层提供技术指导和建议"
          ]
        }
      }
    },
    footer: {
      letsConnect: "联系我！",
      description: "我总是对新机会、合作和有趣的项目感兴趣。如果您想一起工作或只是想聊聊技术，请随时联系！",
      downloadResume: "下载简历",
      copyright: "© {year} 安德鲁·伯根塔尔。保留所有权利。",
      builtWith: "使用React、TypeScript和Framer Motion构建"
    },
    contact: {
      sendMessage: "给我发消息",
      name: "姓名 *",
      email: "邮箱 *",
      subject: "主题",
      message: "消息 *",
      namePlaceholder: "您的姓名",
      emailPlaceholder: "your.email@example.com",
      subjectPlaceholder: "关于什么？",
      messagePlaceholder: "告诉我您的项目、机会，或者打个招呼！",
      sendButton: "发送消息",
      sending: "正在打开邮箱...",
      successMessage: "✅ 您的邮箱客户端应该会打开，消息已准备好发送！",
      errorMessage: "❌ 出错了。请重试或直接给我发邮件。",
      orReachOut: "或直接联系："
    }
  }
};

