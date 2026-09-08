export const projects = [
  {
    id: 1,
    title: "ShopU",
    description: "Senior capstone: built a full-stack social commerce platform for college students in a five-person Agile team, delivering an end-to-end MVP tested with 8 early pilot users. Developed an ML-based ranking algorithm using TF-IDF and boosting, improving precision and recall over a chronological baseline to better surface listings matching user interests.",
    image: "/projects/shopu.png",
    technologies: ["Python", "React", "Node.js", "JavaScript", "Git", "TF-IDF", "Machine Learning", "Agile"],
    github: "https://github.com/bergenthala/ShopU",
    live: null,
    featured: true
  },
  {
    id: 2,
    title: "OldBaileyProject",
    description: "Developed multiple classifiers (ID3, Perceptron, SVM, Logistic Regression) for court trial data analysis. Achieved 75% accuracy in Kaggle competition on predicting guilty/not guilty verdicts using scikit-learn and advanced machine learning techniques.",
    image: "/projects/oldbailey.png",
    technologies: ["Python", "scikit-learn", "ID3", "Perceptron", "SVM", "Logistic Regression", "Kaggle"],
    github: null,
    live: null,
    featured: true
  },
  {
    id: 3,
    title: "AI-Powered Browser Extension",
    description: "Feature-rich Chrome Extension prototype developed at Adobe using Vite + React that summarizes page content in real-time and incorporates a unique, patent-pending feature for enhanced context awareness with LLM integration.",
    image: "/projects/ai-extension.png",
    technologies: ["Vite", "React", "JavaScript", "Chrome Extension API", "Adobe RSP UI", "LLM Integration"],
    github: null,
    live: null,
    featured: true
  },
  {
    id: 4,
    title: "Fidelity PDF Automation",
    description: "Web app demo built at Fidelity using JavaScript, Angular, HTML, and Fidelity UI components. Implemented fillable PDF functionality using pdf.js and ngx-extended-pdf-viewer, projected to save millions annually by reducing manual paperwork.",
    image: "/projects/fidelity-pdf.png",
    technologies: ["JavaScript", "Angular", "HTML", "Fidelity UI", "pdf.js", "ngx-extended-pdf-viewer", "HTTPClient"],
    github: null,
    live: null,
    featured: false
  }
];
