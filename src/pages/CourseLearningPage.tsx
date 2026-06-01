import { useState } from 'react';
import {
    CheckCircle, Lock, BookOpen, ChevronLeft, GraduationCap,
    Search, Bell, Settings, LayoutList, ChevronDown, PanelLeftOpen, PanelLeftClose,
    ClipboardList, MessageSquare, Star, FolderOpen, FileText,
    ThumbsUp, Send, Smile, ChevronRight, Sparkles, FileCode2,
    ThumbsUpIcon, ThumbsDownIcon, Users, Bot, Calendar, FileSpreadsheet
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { VideoPlayer } from '../components/VideoPlayer';
import sessionVideo from '../assets/videos/session.mp4';
import dummyAudio from '../assets/audio/dummyaudio.mp3';
import Logo from "../assets/images/logo.svg";
import { ChatTextArea } from '../components/ChatTextArea';

const modules = [
    {
        id: 1,
        title: 'Module 1',
        subtitle: 'Neural Networks Fundamentals',
        locked: false,
        sections: [
            {
                title: 'Introduction',
                lessons: [
                    { id: '1.1', title: 'Course Introduction', type: 'Video', duration: '4 min', done: true },
                    { id: '1.2', title: 'A Quick Note for the Best Learning Experience', type: 'Reading', duration: '2 min', done: false },
                    { id: '1.3', title: 'Course Syllabus', type: 'Reading', duration: '5 min', done: false },
                ],
            },
        ],
    },
    {
        id: 2,
        title: 'Module 2',
        subtitle: 'Data Representation',
        locked: true,
        sections: [
            {
                title: 'Core Concepts',
                lessons: [
                    { id: '2.1', title: 'Vectors and Matrices', type: 'Video', duration: '8 min', done: false },
                    { id: '2.2', title: 'Dot Products Explained', type: 'Reading', duration: '5 min', done: false },
                    { id: '2.3', title: 'Practice Exercise', type: 'Audio', duration: '6 min', done: false },
                ],
            },
        ],
    },
    {
        id: 3,
        title: 'Module 3',
        subtitle: 'Activation & Optimization',
        locked: true,
        sections: [
            {
                title: 'Deep Dive',
                lessons: [
                    { id: '3.1', title: 'Activation Functions', type: 'Video', duration: '10 min', done: false },
                    { id: '3.2', title: 'Gradient Descent', type: 'Reading', duration: '7 min', done: false },
                    { id: '3.3', title: 'Optimization Strategies', type: 'Audio', duration: '9 min', done: false },
                ],
            },
        ],
    },
    {
        id: 4,
        title: 'Module 4',
        subtitle: 'Neural Networks Advanced',
        locked: true,
        sections: [
            {
                title: 'Neural Networks',
                lessons: [
                    { id: '4.1', title: '4.1 Neural Architectures', type: 'Video', duration: '18 min', done: false },
                    { id: '4.2', title: '4.2 Backpropagation', type: 'Reading', duration: '10 min', done: false },
                    { id: '4.3', title: '4.3 Neural Architectures Advance', type: 'Audio', duration: '12 min', done: false },
                ],
            },
        ],
    },
];

const allLessons = modules.flatMap(m => m.sections.flatMap(s => s.lessons));

const previousChapters = [{ id: '3.0', title: '3.0 Linear Models', status: 'done' }];

const trainer = {
    name: 'John Smith',
    title: 'Senior JavaScript Developer',
    avatar: 'https://api.dicebear.com/9.x/notionists/svg?seed=trainer1',
    rating: 4.8,
    reviews: 1250,
};

const tabs = ['Lesson Details', 'Resources (4)', 'Assessment', 'Comments', 'Trainer Chat', 'Co-learners', 'AI History'] as const;
type Tab = typeof tabs[number];

const comments = [
    { id: 1, user: 'Alice Johnson', avatar: 'https://api.dicebear.com/9.x/notionists/svg?seed=alice', text: 'Great explanation of variable hoisting!', time: '2 hours ago', likes: 5 },
    { id: 2, user: 'Bob Smith', avatar: 'https://api.dicebear.com/9.x/notionists/svg?seed=bob', text: 'Could you explain more about const vs let?', time: '1 hour ago', likes: 3, pinned: true },
];

const testCards = [
    { id: 1, name: '', description: 'Neural Architectures Quiz', completed: false, score: null },
    { id: 2, name: 'Attempt 1', description: 'Neural Architectures Quiz', completed: true, score: 85 },
    { id: 3, name: 'Attempt 2', description: 'Neural Architectures Quiz', completed: true, score: 92 },
];

const notes = [
    { id: 1, title: 'Weight Matrices', content: 'How weights are initialized', timestamp: '10:30' },
    { id: 2, title: 'Activation Functions', content: 'ReLU vs Sigmoid comparison', timestamp: '25:45' },
    { id: 3, title: 'Backpropagation', content: 'Gradient descent steps', timestamp: '40:10' },
];

const mentors = [
    { id: 1, name: 'Sarah Johnson', domain: 'Deep Learning', avatar: 'mentor1' },
    { id: 2, name: 'Mike Chen', domain: 'Computer Vision', avatar: 'mentor2' },
    { id: 3, name: 'Emily Davis', domain: 'NLP & Transformers', avatar: 'mentor3' },
];

const trainerMessages = [
    { id: 1, sender: 'trainer', name: trainer.name, avatar: trainer.avatar, message: 'Welcome! Feel free to ask any questions about neural networks.', time: '2 hours ago' },
    { id: 2, sender: 'student', name: 'You', avatar: 'https://api.dicebear.com/9.x/notionists/svg?seed=current-user', message: 'Thank you! Looking forward to learning about backpropagation.', time: '2 hours ago' },
    { id: 3, sender: 'trainer', name: trainer.name, avatar: trainer.avatar, message: 'Great! We will cover weight initialization and activation functions in depth today.', time: '1 hour ago' },
];

const coLearners = [
    { id: 1, name: 'Alex Johnson', avatar: 'https://api.dicebear.com/9.x/notionists/svg?seed=alex', rank: 2, score: 2450, progress: 85, isCurrentUser: false },
    { id: 2, name: 'Sarah Chen', avatar: 'https://api.dicebear.com/9.x/notionists/svg?seed=sarah', rank: 1, score: 2680, progress: 92, isCurrentUser: false },
    { id: 3, name: 'Vicky S', avatar: 'https://api.dicebear.com/9.x/notionists/svg?seed=varient5', rank: 5, score: 1890, progress: 74, isCurrentUser: true },
    { id: 4, name: 'Mike Rodriguez', avatar: 'https://api.dicebear.com/9.x/notionists/svg?seed=mike', rank: 3, score: 2200, progress: 80, isCurrentUser: false },
    { id: 5, name: 'Emma Davis', avatar: 'https://api.dicebear.com/9.x/notionists/svg?seed=emma', rank: 4, score: 2050, progress: 75, isCurrentUser: false },
];

const chatHistories = [
    { id: 1, name: 'Neural Network Basics', date: 'Yesterday, 3:45 PM', preview: 'What is a perceptron?' },
    { id: 2, name: 'Activation Functions', date: 'Today, 10:30 AM', preview: 'Explain ReLU vs Sigmoid' },
    { id: 3, name: 'Backpropagation Steps', date: 'Today, 2:15 PM', preview: 'How does gradient descent work?' },
];

export default function CourseLearningPage() {
    const [activeTab, setActiveTab] = useState<Tab>('Lesson Details');
    const [activeLesson, setActiveLesson] = useState(allLessons[0]);
    const [expandedModules, setExpandedModules] = useState<number[]>([1]);
    const [showAllLearners, setShowAllLearners] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const navigate = useNavigate();
    const toggleModule = (id: number) =>
        setExpandedModules(prev => prev.includes(id) ? [] : [id]);
    const currentUser = coLearners.find(l => l.isCurrentUser);
    const topLearners = [...coLearners].sort((a, b) => a.rank - b.rank);
        const suggestions = [
            {
            id: "1",
            text: "Summarize my course.",
            },
            {
            id: "2",
            text: "Which course suits me best?",
            },
        ];
    return (
        <div className="flex h-full bg-white overflow-hidden w-full">
            {/* Left Sidebar */}
            {sidebarOpen && (
            <div className="w-72 shrink-0 border-r border-gray-100 flex flex-col overflow-y-auto py-5 px-4">
                <Link to="/" className="flex items-center gap-2 mb-6">
                <   img src={Logo} alt="" width={'50%'} />
                </Link>

                <p className="text-[10px] font-bold text-[#00BF53] uppercase tracking-widest mb-1">Now Studying</p>
                <h2 className="font-bold text-base text-gray-900 mb-1">AI Fundamentals</h2>
                <div className="h-0.5 w-8 bg-[#00BF53] rounded mb-4" />

                {modules.map((mod) => {
                    const isExpanded = expandedModules.includes(mod.id);
                    return (
                        <div key={mod.id} className="border-b border-gray-100 last:border-0">
                            <button
                                onClick={() => toggleModule(mod.id)}
                                className="w-full flex items-start justify-between py-3 text-left"
                            >
                                <div>
                                    <p className="text-xs text-gray-400 font-semibold">{mod.title}</p>
                                    <p className="text-sm font-bold text-gray-900 mt-0.5">{mod.subtitle}</p>
                                </div>
                                <div className="flex items-center gap-1.5 mt-1 shrink-0">
                                    {mod.locked && <Lock className="w-3.5 h-3.5 text-gray-400" />}
                                    {isExpanded
                                        ? <ChevronDown className="w-4 h-4 text-gray-400 rotate-180 transition-transform" />
                                        : <ChevronDown className="w-4 h-4 text-gray-400 transition-transform" />}
                                </div>
                            </button>
                            {isExpanded && (
                                <div className="pb-3">
                                    {mod.sections.map((section) => (
                                        <div key={section.title}>
                                            <p className="text-xs text-gray-400 font-semibold mb-2 mt-1">{section.title}</p>
                                            <ul className="space-y-1">
                                                {section.lessons.map((lesson) => {
                                                    const isActive = activeLesson.id === lesson.id;
                                                    return (
                                                        <li
                                                            key={lesson.id}
                                                            onClick={() => setActiveLesson(lesson)}
                                                            className="flex items-start gap-3 px-1 py-2 rounded-lg cursor-pointer hover:bg-gray-50"
                                                        >
                                                            <div className={`mt-0.5 w-6 h-6 rounded-full shrink-0 flex items-center justify-center border-2 ${
                                                                lesson.done
                                                                    ? 'bg-[#00BF53] border-[#00BF53]'
                                                                    : isActive
                                                                    ? 'border-[#00BF53] bg-white'
                                                                    : 'border-gray-300 bg-white'
                                                            }`}>
                                                                {lesson.done && <CheckCircle className="w-4 h-4 text-white" />}
                                                            </div>
                                                            <span className="flex-1 min-w-0">
                                                                <span className={`block text-sm leading-snug ${isActive ? 'font-semibold text-gray-900' : 'text-gray-700'}`}>{lesson.title}</span>
                                                                <span className="text-[11px] text-[#00BF53]">{lesson.type} • {lesson.duration}</span>
                                                            </span>
                                                        </li>
                                                    );
                                                })}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                })}

                <div className="mt-auto pt-6">
                    <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[#00BF53] text-white text-sm font-semibold rounded-xl hover:bg-[#00a847] transition-colors">
                        <Sparkles className="w-4 h-4" /> Ask AI Assistant
                    </button>
                </div>
            </div>
            )}

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-y-auto w-full">
            {/* Top Nav */}
                <div className="sticky top-0 z-20 border-b border-[#0d0d0d0d] bg-white px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-sm">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-[7px] hover:bg-gray-100 rounded-full text-gray-500 hover:text-[#00BF53]">
              {sidebarOpen ? <PanelLeftClose className="w-4 h-4" /> : <PanelLeftOpen className="w-4 h-4" />}
            </button>
            <button onClick={() => navigate('/landing')} className="text-gray-500 hover:text-[#00BF53]">Courses</button>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-gray-800 font-medium">AI Fundamentals</span>
          </div>
          <div className="flex items-center gap-4 text-gray-500">
                    <button className="p-[7px] hover:bg-gray-100 rounded-full"><Search className="w-4 h-4" /></button>
                    <button className="p-[7px] hover:bg-gray-100 rounded-full"><Bell className="w-4 h-4" /></button>
                    <button className="p-[7px] hover:bg-gray-100 rounded-full"><Settings className="w-4 h-4" /></button>
                </div>
        </div>
      </div>
                {/* Scrollable content */}
                <div className="flex-1  max-w-5xl mx-auto px-6 pt-6 pb-[3rem] w-full mb-10">
                    <div className="px-6 py-6">
                        {/* Lesson Content based on type */}
                        <div className="flex items-center justify-between mb-3">
                            <h2 className="text-sm font-semibold text-gray-700">{activeLesson.title}</h2>
                            <div className="flex items-center gap-2">
                                {allLessons.findIndex(l => l.id === activeLesson.id) > 0 && (
                                    <button
                                        onClick={() => {
                                            const idx = allLessons.findIndex(l => l.id === activeLesson.id);
                                            setActiveLesson(allLessons[idx - 1]);
                                        }}
                                        className="flex items-center gap-1.5 px-4 py-1.5 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
                                    >
                                        <ChevronLeft className="w-4 h-4" /> Previous
                                    </button>
                                )}
                                {allLessons.findIndex(l => l.id === activeLesson.id) === allLessons.length - 1 ? (
                                    <button
                                        onClick={() => navigate('/landing')}
                                        className="flex items-center gap-1.5 px-4 py-1.5 bg-[#00BF53] text-white text-sm font-medium rounded-lg hover:bg-[#00a847] transition-colors"
                                    >
                                        Finish <CheckCircle className="w-4 h-4" />
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => {
                                            const idx = allLessons.findIndex(l => l.id === activeLesson.id);
                                            setActiveLesson(allLessons[idx + 1]);
                                        }}
                                        className="flex items-center gap-1.5 px-4 py-1.5 bg-[#00BF53] text-white text-sm font-medium rounded-lg hover:bg-[#00a847] transition-colors"
                                    >
                                        Next <ChevronRight className="w-4 h-4" />
                                    </button>
                                )}
                            </div>
                        </div>
                        {activeLesson.type === 'Video' && (
                            <div className="rounded-2xl overflow-hidden">
                                <VideoPlayer videoSrc={sessionVideo} onCourseDetailsClick={() => {}} />
                            </div>
                        )}
                        {activeLesson.type === 'Audio' && (
                            <div className="rounded-2xl bg-gray-50 flex flex-col items-center justify-center py-16 gap-4">
                                <div className="w-20 h-20 rounded-full bg-[#00BF53]/10 flex items-center justify-center">
                                    <svg className="w-8 h-8 text-[#00BF53]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3a9 9 0 110 18A9 9 0 0112 3zm-1 5v8l6-4-6-4z"/></svg>
                                </div>
                                <p className="text-sm font-semibold text-gray-800">{activeLesson.title}</p>
                                <p className="text-xs text-gray-400">Audio • {activeLesson.duration}</p>
                                <audio controls className="w-full max-w-sm mt-2">
                                    <source src={dummyAudio} type="audio/mpeg" />
                                </audio>
                            </div>
                        )}
                        {activeLesson.type === 'Reading' && (
                            <div className="rounded-2xl bg-gray-50 px-8 py-8 text-sm text-gray-700 leading-relaxed space-y-4 max-h-[420px] overflow-y-auto">
                                <h3 className="text-lg font-bold text-gray-900">{activeLesson.title}</h3>
                                <p>In this lesson, we explore the fundamental building blocks of modern neural networks. We'll start with the mathematical foundations of artificial neurons and progress toward complex multi-layer perceptrons (MLP).</p>
                                <p>A neural network is composed of layers of interconnected nodes, or neurons, each performing a weighted sum of its inputs followed by a non-linear activation function. The choice of activation function — ReLU, Sigmoid, or Tanh — significantly impacts the network's ability to learn complex patterns.</p>
                                <p>Weight initialization is a critical step. Poor initialization can lead to the vanishing or exploding gradient problem, making training unstable. Techniques like Xavier and He initialization help mitigate these issues.</p>
                                <p>By the end of this module, you will understand how weight matrices and activation functions work in tandem to process high-dimensional data and enable deep learning models to generalize effectively.</p>
                                <h4 className="text-base font-bold text-gray-900 pt-2">Backpropagation Explained</h4>
                                <p>Backpropagation is the algorithm used to train neural networks by computing the gradient of the loss function with respect to each weight. It works by applying the chain rule of calculus, propagating error signals backward from the output layer to the input layer.</p>
                                <p>During the forward pass, input data flows through the network layer by layer, producing a prediction. The loss function then measures the difference between the prediction and the true label. In the backward pass, gradients are computed for each parameter and used to update weights via gradient descent.</p>
                                <h4 className="text-base font-bold text-gray-900 pt-2">Gradient Descent Variants</h4>
                                <p>Stochastic Gradient Descent (SGD) updates weights after each training example, making it noisy but fast. Mini-batch gradient descent strikes a balance by updating weights after a small batch of examples. Adam optimizer combines momentum and adaptive learning rates, making it the most widely used optimizer in practice.</p>
                                <p>Learning rate is one of the most important hyperparameters. Too high and the model diverges; too low and training is extremely slow. Learning rate schedulers like cosine annealing and step decay help manage this over the course of training.</p>
                                <h4 className="text-base font-bold text-gray-900 pt-2">Regularization Techniques</h4>
                                <p>Overfitting occurs when a model learns the training data too well and fails to generalize. Dropout randomly deactivates neurons during training, forcing the network to learn redundant representations. L2 regularization (weight decay) penalizes large weights, encouraging simpler models.</p>
                                <p>Batch normalization normalizes activations within a mini-batch, stabilizing training and allowing higher learning rates. It has become a standard component in modern deep learning architectures.</p>
                                <h4 className="text-base font-bold text-gray-900 pt-2">Practical Considerations</h4>
                                <p>When training deep networks, monitoring the loss curve is essential. A training loss that decreases while validation loss increases signals overfitting. Early stopping halts training when validation performance stops improving, preventing wasted computation and overfitting.</p>
                                <p>Data augmentation artificially expands the training set by applying transformations such as flipping, cropping, and color jitter. This is especially effective in computer vision tasks and significantly improves generalization.</p>
                            </div>
                        )}
                                    {/* Trainer Details */}
            <div className="bg-white py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={trainer.avatar}
                    alt="Trainer"
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h3 className="font-semibold text-sm text-gray-900">
                      {trainer.name}
                    </h3>
                    <p className="text-sm text-gray-600 flex">
                      {trainer.title}
                      <br />
                      <div className="flex items-center ml-2">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />{" "}
                        {trainer.rating} ({trainer.reviews.toLocaleString()}{" "}
                        reviews)
                      </div>
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex bg-gray-100 rounded-full transition-colors p-2">
                    <button className="flex items-center gap-2 px-2 text-sm font-medium">
                      <ThumbsUpIcon size={16} className="text-gray-600" /> 120
                    </button>
                    <button className="flex items-center gap-2 border-l border-gray-300 px-2">
                      <ThumbsDownIcon size={16} className="text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
                        {/* Tabs */}
                        <div className="border-b border-gray-100 mb-5">
                            <div className="flex gap-1">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                                            activeTab === tab
                                                ? 'border-gray-900 text-gray-900'
                                                : 'border-transparent text-gray-500 hover:text-gray-700'
                                        }`}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Tab Content */}
                        {activeTab === 'Lesson Details' && (
                            <div className="flex gap-6">
                                {/* Left: lesson info + files */}
                                <div className="flex-1">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-3">Neural Architectures: Deep Dive</h2>
                                    <p className="text-sm text-gray-500 leading-relaxed mb-6">
                                        In this lesson, we explore the fundamental building blocks of modern neural networks. We'll start with the mathematical foundations of artificial neurons and progress toward complex multi-layer perceptrons (MLP). By the end of this module, you will understand how weight matrices and activation functions work in tandem to process high-dimensional data.
                                    </p>

                                    {/* File attachments */}
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="flex items-center gap-3 border border-gray-100 rounded-xl px-4 py-3 hover:border-gray-200 cursor-pointer">
                                            <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center shrink-0">
                                                <FileText className="w-5 h-5 text-blue-500" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold text-gray-800">Lecture Notes.pdf</p>
                                                <p className="text-xs text-gray-400">12.4 MB</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 border border-gray-100 rounded-xl px-4 py-3 hover:border-gray-200 cursor-pointer">
                                            <div className="w-9 h-9 bg-purple-50 rounded-lg flex items-center justify-center shrink-0">
                                                <FileCode2 className="w-5 h-5 text-purple-500" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold text-gray-800">Python Workbook</p>
                                                <p className="text-xs text-gray-400">Jupyter Notebook</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Right: AI Summary */}
                                <div className="w-56 shrink-0">
                                    <div className="border border-gray-100 rounded-2xl p-4">
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center gap-2">
                                                <Sparkles className="w-4 h-4 text-[#00BF53]" />
                                                <span className="text-sm font-bold text-gray-900">AI Summary</span>
                                            </div>
                                            <Sparkles className="w-4 h-4 text-gray-300" />
                                        </div>
                                        <ul className="space-y-2 mb-4">
                                            {[
                                                'Focus on ReLU activation benefits over Sigmoid.',
                                                'Visualizing weight initialization strategies.',
                                                'Key takeaway: vanishing gradient problem.',
                                            ].map((point) => (
                                                <li key={point} className="flex items-start gap-1.5 text-xs text-gray-600">
                                                    <span className="mt-1.5 w-1 h-1 rounded-full bg-gray-400 shrink-0" />
                                                    {point}
                                                </li>
                                            ))}
                                        </ul>
                                        <button className="w-full px-3 py-2 border border-[#00BF53] text-[#00BF53] text-xs font-semibold rounded-lg hover:bg-[#00BF53]/10 transition-colors">
                                            Generate Full Study Guide
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'Resources (4)' && (
                            <div className="space-y-2">
                                {['Lecture Notes.pdf', 'Python Workbook.ipynb', 'Slides.pptx', 'Reference Paper.pdf'].map((doc) => (
                                    <div key={doc} className="flex items-center gap-3 border border-gray-100 rounded-lg px-4 py-3 hover:border-blue-200 cursor-pointer">
                                        <FileText className="w-5 h-5 text-blue-500" />
                                        <span className="text-sm font-medium text-gray-800">{doc}</span>
                                        <ChevronRight className="w-4 h-4 text-gray-400 ml-auto" />
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeTab === 'Assessment' && (
                            <div>
                                <div className="mb-6">
                                    <h2 className="text-xl font-semibold text-gray-900 mb-2">See how you are doing in this lesson.</h2>
                                    <p className="text-gray-600 text-sm">Each test you take shows how much you've learned so far.</p>
                                </div>
                                <div className="flex gap-4 mb-6">
                                    <div className="space-x-2"><span className="text-xl font-bold text-gray-900">2</span><span className="text-sm text-gray-600">Tests Completed</span></div>
                                    <div className="space-x-2"><span className="text-xl font-bold text-green-600">88.5%</span><span className="text-sm text-gray-600">Average Score</span></div>
                                </div>
                                <div className="space-y-3">
                                    {testCards.map((test) => (
                                        <div key={test.id} className="border border-gray-200 rounded-lg px-4 py-3 flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                                                    <ClipboardList className="w-4 h-4 text-gray-600" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-gray-900">{test.name || 'New Assessment'}</p>
                                                    <p className="text-xs text-gray-500">{test.description}</p>
                                                </div>
                                            </div>
                                            {!test.completed ? (
                                                <button className="px-4 py-2 text-[#00BF53] rounded-full border border-[#00BF53] text-sm font-medium">Start Test</button>
                                            ) : (
                                                <div className="text-right">
                                                    <div className="text-lg font-semibold text-green-600">{test.score}%</div>
                                                    <div className="text-xs text-gray-500">Completed</div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'Comments' && (
                            <div>
                                <div className="flex gap-2 mb-6">
                                    <img src="https://api.dicebear.com/9.x/notionists/svg?seed=current-user" className="w-8 h-8 rounded-full" />
                                    <div className="flex-1 flex gap-2">
                                        <input type="text" placeholder="Add a comment..." className="flex-1 px-3 py-2 text-sm border-b border-gray-300 focus:outline-none focus:border-[#00BF53]" />
                                        <button className="px-3 bg-[#00BF53] text-white rounded-full"><Send className="w-3 h-3" /></button>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    {comments.map((comment) => (
                                        <div key={comment.id} className="flex gap-3">
                                            <img src={comment.avatar} className="w-8 h-8 rounded-full shrink-0" />
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="font-medium text-sm text-gray-900">{comment.user}</span>
                                                    {comment.pinned && <span className="px-2 py-0.5 bg-gray-200 text-gray-600 text-xs rounded-full">Pinned</span>}
                                                    <span className="text-xs text-gray-500">{comment.time}</span>
                                                </div>
                                                <p className="text-sm text-gray-700 mb-2">{comment.text}</p>
                                                <div className="flex items-center gap-4">
                                                    <button className="flex items-center gap-1 text-xs text-gray-600 hover:text-[#00BF53]">
                                                        <ThumbsUp className="w-3 h-3" />{comment.likes}
                                                    </button>
                                                    <button className="text-xs text-gray-600 hover:text-[#00BF53]">Reply</button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'Trainer Chat' && (
                            <div>
                                <div className="mb-4">
                                    <h2 className="text-xl font-bold text-gray-900 mb-1">This space is just for you and your Trainer</h2>
                                    <p className="text-gray-600 text-sm">Ask questions, get clarity, and learn with personal guidance.</p>
                                </div>
                                <div className="flex gap-3 mb-6">
                                    <img src="https://api.dicebear.com/9.x/notionists/svg?seed=current-user" className="w-8 h-8 rounded-full" />
                                    <input type="text" placeholder="Ask a question or share your thoughts..." className="flex-1 py-2 border-0 border-b border-gray-300 focus:outline-none focus:border-[#00BF53] text-sm bg-transparent" />
                                </div>
                                <div className="space-y-6">
                                    {trainerMessages.map((msg) => (
                                        <div key={msg.id} className="flex items-start gap-3">
                                            <img src={msg.avatar} className="w-8 h-8 rounded-full shrink-0" />
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="font-medium text-sm text-gray-900">{msg.name}</span>
                                                    {msg.sender === 'trainer' && <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full">Trainer</span>}
                                                    <span className="text-xs text-gray-500">{msg.time}</span>
                                                </div>
                                                <p className="text-sm text-gray-700 mb-2">{msg.message}</p>
                                                <div className="flex items-center gap-4">
                                                    <button className="flex items-center gap-1 text-xs text-gray-600 hover:text-[#00BF53]"><ThumbsUp className="w-3 h-3" /> Like</button>
                                                    <button className="text-xs text-gray-600 hover:text-[#00BF53]">Reply</button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'Co-learners' && (
                            <div>
                                <div className="mb-4">
                                    <h2 className="text-xl font-bold text-gray-900 mb-1">Learning Network</h2>
                                    <p className="text-gray-600 text-sm">Connect with fellow students and track progress</p>
                                </div>
                                <div className="max-w-lg">
                                    {currentUser && (
                                        <div className="border border-[#00BF53] rounded-lg p-4 mb-4">
                                            <div className="flex items-center gap-3">
                                                <div className="relative">
                                                    <img src={currentUser.avatar} className="w-12 h-12 rounded-full border border-[#00BF53]" />
                                                    <div className="absolute -top-1 -right-1 bg-yellow-400 text-black rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">#{currentUser.rank}</div>
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-sm">Your Rank</h3>
                                                    <p className="text-gray-600 text-sm">{currentUser.score} points • {currentUser.progress}%</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    <div className="border rounded-lg p-3">
                                        <h3 className="font-semibold text-gray-900 text-sm mb-3">Top Learners</h3>
                                        <div className="divide-y">
                                            {topLearners.slice(0, showAllLearners ? undefined : 3).map((learner) => (
                                                <div key={learner.id} className="py-2 flex items-center gap-3">
                                                    <img src={learner.avatar} className="w-8 h-8 rounded-full" />
                                                    <div className="flex-1">
                                                        <h4 className={`font-medium text-sm ${learner.isCurrentUser ? 'text-[#00BF53]' : 'text-gray-900'}`}>
                                                            {learner.name}{learner.isCurrentUser && ' (You)'}
                                                        </h4>
                                                        <div className="text-xs text-gray-600">{learner.score} points • {learner.progress}%</div>
                                                    </div>
                                                    <div className="text-sm font-bold text-gray-900">#{learner.rank}</div>
                                                </div>
                                            ))}
                                        </div>
                                        {coLearners.length > 3 && (
                                            <button onClick={() => setShowAllLearners(!showAllLearners)} className="mt-2 text-sm text-gray-600 hover:text-[#00BF53] w-full text-center">
                                                {showAllLearners ? 'Show Less' : 'Show More'}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'AI History' && (
                            <div>
                                <div className="mb-4">
                                    <h2 className="text-xl font-bold text-gray-900 mb-1">AI Chat History</h2>
                                    <p className="text-gray-600 text-sm">Review your previous conversations with AI assistant</p>
                                </div>
                                <div className="space-y-3">
                                    {chatHistories.map((chat) => (
                                        <button key={chat.id} className="w-full text-left p-4 border border-gray-200 rounded-lg hover:border-[#00BF53] transition-all">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <h3 className="font-medium text-gray-900 mb-1">{chat.name}</h3>
                                                    <p className="text-sm text-gray-500">{chat.date}</p>
                                                </div>
                                                <ChevronRight className="w-4 h-4 text-gray-400" />
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}


                    </div>
                </div>
{/* Chat Text Area - Centered within course section */}
                  <div
                    className="fixed bottom-[20px] z-[60]"
                    style={{
                      left: "calc(50% + 500px - 50vw)",
                      width: "calc(100vw - 760px)",
                    }}
                  >
                    <ChatTextArea
                      placeholder="Ask AI about this session..."
                      suggestions={suggestions}
                      onSendMessage={(message) => console.log("Chat message:", message)}
                    />
                  </div>
            </div>
        </div>
    );
}
