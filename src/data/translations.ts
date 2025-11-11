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
      subtitle: "MSE Computer Science Student | Software Engineer | AI & Software Enthusiast",
      description: "Graduate student at University of Pennsylvania with experience at Adobe and Fidelity. Passionate about AI, Machine Learning, FinTech, and Full-Stack Development.",
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
      heading: "Computer Science Graduate Student & Software Engineer",
      paragraph1: "Hi, I'm Andrew, a Computer Science graduate student at the University of Pennsylvania, pursuing my MSE in Computer and Information Science. I recently completed my BS in Computer Science (Honors) at the University of Utah with a 3.81 GPA and Dean's List recognition.",
      paragraph2: "With experience at top companies like Adobe and Fidelity Investments, I've worked on everything from AI-powered browser extensions with patent-pending features to high-performance pdf readers. I'm passionate about AI, Machine Learning, FinTech, and Full-Stack Development.",
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
          description: "Senior capstone project: built a social commerce app for college students, delivering end-to-end MVP. Developed ML-based ranking algorithm (TF-IDF + boosting) to improve content relevance and designed 90% of UI components and CSS for rapid iteration."
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
        adobe: {
          position: "Software Engineer Intern",
          description: "Developed a feature-rich Chrome Extension prototype in Vite + React that summarizes page content in real-time and incorporates a unique, patent-pending feature for enhanced context awareness. Collaborated with designers, PMs, and engineers to deliver feature-complete MVP on schedule for internal review.",
          achievements: [
            "Developed Chrome Extension with real-time page content summarization",
            "Integrated unique patent-pending feature for enhanced context awareness",
            "Collaborated with cross-functional teams to deliver MVP on schedule",
            "Integrated Adobe RSP UI with backend APIs for real-time LLM interactions"
          ]
        },
        fidelity: {
          position: "Full Stack Software Engineer Intern",
          description: "Built a web app demo using JavaScript, Angular, HTML, and Fidelity UI components. Implemented fillable PDF functionality and connected to product APIs via HTTPClient, integrating into main product pipeline.",
          achievements: [
            "Built web app demo with JavaScript, Angular, and Fidelity UI components",
            "Implemented fillable PDF functionality using pdf.js and ngx-extended-pdf-viewer",
            "Connected to product APIs via HTTPClient for main product pipeline integration",
            "Projected to save millions annually by reducing manual paperwork",
            "Demoed to senior leadership, greatly exceeding expectations"
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
      subtitle: "MSEコンピュータサイエンス学生 | ソフトウェアエンジニア | AI・ソフトウェア愛好家",
      description: "ペンシルベニア大学の大学院生で、AdobeとFidelityでの経験があります。AI、機械学習、FinTech、フルスタック開発に情熱を持っています。",
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
      heading: "コンピュータサイエンス大学院生 & ソフトウェアエンジニア",
      paragraph1: "こんにちは、私はアンドリューです。ペンシルベニア大学でコンピュータサイエンスの大学院生として、コンピュータ・情報科学のMSEを追求しています。最近、ユタ大学でコンピュータサイエンスの学士号（優等）を3.81のGPAと学部長表彰を受けて修了しました。",
      paragraph2: "AdobeやFidelity Investmentsなどのトップ企業での経験を持ち、特許出願中の機能を備えたAI搭載ブラウザ拡張機能から高性能PDFリーダーまで、あらゆるものに取り組んできました。AI、機械学習、FinTech、フルスタック開発に情熱を持っています。",
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
          description: "卒業プロジェクト：大学生向けのソーシャルコマースアプリを構築し、エンドツーエンドのMVPを提供。コンテンツの関連性を向上させるMLベースのランキングアルゴリズム（TF-IDF + boosting）を開発し、迅速な反復のためにUIコンポーネントとCSSの90%を設計しました。"
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
        adobe: {
          position: "ソフトウェアエンジニアインターン",
          description: "Vite + Reactを使用して、ページコンテンツをリアルタイムで要約し、強化されたコンテキスト認識のための独自の特許出願中の機能を組み込んだ機能豊富なChrome拡張機能プロトタイプを開発。デザイナー、PM、エンジニアと協力して、内部レビューのためにスケジュール通りに機能完全なMVPを提供しました。",
          achievements: [
            "リアルタイムページコンテンツ要約機能を備えたChrome拡張機能を開発",
            "強化されたコンテキスト認識のための独自の特許出願中の機能を統合",
            "クロスファンクショナルチームと協力してスケジュール通りにMVPを提供",
            "リアルタイムLLM相互作用のためにAdobe RSP UIをバックエンドAPIと統合"
          ]
        },
        fidelity: {
          position: "フルスタックソフトウェアエンジニアインターン",
          description: "JavaScript、Angular、HTML、およびFidelity UIコンポーネントを使用してWebアプリデモを構築。記入可能なPDF機能を実装し、HTTPClient経由で製品APIに接続し、メインプロダクトパイプラインに統合しました。",
          achievements: [
            "JavaScript、Angular、およびFidelity UIコンポーネントを使用してWebアプリデモを構築",
            "pdf.jsとngx-extended-pdf-viewerを使用して記入可能なPDF機能を実装",
            "メインプロダクトパイプライン統合のためにHTTPClient経由で製品APIに接続",
            "手動の書類作業を削減することで年間数百万ドルを節約すると予測",
            "上級リーダーシップにデモを行い、期待を大きく上回る結果を達成"
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
      subtitle: "MSE计算机科学学生 | 软件工程师 | AI和软件爱好者",
      description: "宾夕法尼亚大学研究生，在Adobe和Fidelity有工作经验。对AI、机器学习、金融科技和全栈开发充满热情。",
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
      heading: "计算机科学研究生 & 软件工程师",
      paragraph1: "你好，我是安德鲁，宾夕法尼亚大学计算机科学研究生，正在攻读计算机与信息科学硕士学位。最近，我在犹他大学完成了计算机科学学士学位（荣誉），GPA为3.81，并获得院长名单认可。",
      paragraph2: "在Adobe和富达投资等顶级公司有工作经验，我从事过从具有专利申请功能的AI驱动浏览器扩展到高性能PDF阅读器等各个方面。我对AI、机器学习、金融科技和全栈开发充满热情。",
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
          description: "高级毕业设计项目：为大学生构建了一个社交商务应用，交付了端到端的MVP。开发了基于机器学习的排名算法（TF-IDF + boosting）以提高内容相关性，并设计了90%的UI组件和CSS以实现快速迭代。"
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
        adobe: {
          position: "软件工程师实习生",
          description: "使用Vite + React开发了一个功能丰富的Chrome扩展原型，可实时总结页面内容，并集成了独特的专利申请功能以增强上下文感知。与设计师、产品经理和工程师合作，按时交付了功能完整的MVP供内部审查。",
          achievements: [
            "开发了具有实时页面内容摘要功能的Chrome扩展",
            "集成了独特的专利申请功能以增强上下文感知",
            "与跨职能团队合作按时交付MVP",
            "将Adobe RSP UI与后端API集成以实现实时LLM交互"
          ]
        },
        fidelity: {
          position: "全栈软件工程师实习生",
          description: "使用JavaScript、Angular、HTML和富达UI组件构建了Web应用演示。实现了可填写PDF功能，并通过HTTPClient连接到产品API，集成到主要产品管道中。",
          achievements: [
            "使用JavaScript、Angular和富达UI组件构建了Web应用演示",
            "使用pdf.js和ngx-extended-pdf-viewer实现了可填写PDF功能",
            "通过HTTPClient连接到产品API以集成到主要产品管道",
            "预计通过减少手动文书工作每年可节省数百万美元",
            "向高级领导层演示，大大超出预期"
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

