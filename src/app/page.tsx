'use client';
import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, Circle, Calendar, LayoutDashboard, 
  Smartphone, Briefcase, Code2, Settings, ChevronRight, 
  Save, AlertCircle, TrendingUp 
} from 'lucide-react';

// --- 1. 初始数据架构 (包含 Rosewood 和 FDV) ---

const INITIAL_DATA = {
  settings: {
    startDate: new Date().toISOString().split('T')[0], // 默认为今天
    deadlineDays: 48,
    userName: "Commander"
  },
  projects: [
    {
      id: "rosewood",
      name: "Perth Rosewood",
      icon: "furniture",
      color: "bg-amber-600",
      totalOriginalWeeks: 12, // 90天约12周
      phases: [
        {
          id: "rw-p1", name: "基础搭建 (Week 1-2)", originalWeekStart: 1,
          tasks: [
            { id: "rw-1", title: "注册域名 & Shopify (14天试用)", mobile: false },
            { id: "rw-2", title: "联系3-5家工厂索要样品单", mobile: true },
            { id: "rw-3", title: "加入5个珀斯本地FB群组进行调研", mobile: true },
            { id: "rw-4", title: "创建 IG/FB 商业账户", mobile: true },
            { id: "rw-5", title: "下单购买一件样品 (6人餐桌)", mobile: false },
            { id: "rw-6", title: "安排接下来2周的社媒排期 (6个帖子)", mobile: false }
          ]
        },
        {
          id: "rw-p2", name: "广告投放 (Week 3-4)", originalWeekStart: 3,
          tasks: [
            { id: "rw-7", title: "安装 Meta Pixel", mobile: false },
            { id: "rw-8", title: "制作4组广告素材 (前后对比/价格/工艺)", mobile: false },
            { id: "rw-9", title: "启动第一周广告 ($200预算)", mobile: false },
            { id: "rw-10", title: "回复潜在客户咨询 (12小时内)", mobile: true }
          ]
        },
        {
          id: "rw-p3", name: "首单交付 (Week 5-8)", originalWeekStart: 5,
          tasks: [
            { id: "rw-11", title: "样品抵达珀斯 & 验货", mobile: false },
            { id: "rw-12", title: "拍摄产品实拍图并更新网站", mobile: false },
            { id: "rw-13", title: "联系首批 1-2 个意向客户成交", mobile: true },
            { id: "rw-14", title: "向工厂下批量订单 (5-10件)", mobile: false }
          ]
        }
      ]
    },
    {
      id: "fdv-system",
      name: "FDV Social Worker System",
      icon: "code",
      color: "bg-blue-600",
      totalOriginalWeeks: 8,
      phases: [
        {
          id: "fdv-p1", name: "系统基础 & RAG (Week 1)", originalWeekStart: 1,
          tasks: [
            { id: "fdv-1", title: "整理 WA FDV 文档并统一命名", mobile: false },
            { id: "fdv-2", title: "构建 Dify 知识库 (Chunk 750/80)", mobile: false },
            { id: "fdv-3", title: "设计 10 个测试查询 (Risk Indicators)", mobile: true },
            { id: "fdv-4", title: "生成系统架构图 (Agents/Workflows)", mobile: false }
          ]
        },
        {
          id: "fdv-p2", name: "数据库设计 (Week 2)", originalWeekStart: 2,
          tasks: [
            { id: "fdv-5", title: "设计 Client/Case/Risk JSON Schema", mobile: false },
            { id: "fdv-6", title: "在 Dify 创建数据库表结构", mobile: false },
            { id: "fdv-7", title: "生成测试数据 (5 Clients, 3 Notes)", mobile: false }
          ]
        },
        {
          id: "fdv-p3", name: "Agent 开发 (Week 3)", originalWeekStart: 3,
          tasks: [
            { id: "fdv-8", title: "编写 Meeting-Prep Agent Prompt", mobile: false },
            { id: "fdv-9", title: "编写 CaseNote Agent Prompt", mobile: false },
            { id: "fdv-10", title: "编写 Risk Assessment Agent Prompt", mobile: false },
            { id: "fdv-11", title: "在 Claude 测试 Prompt (防幻觉)", mobile: true }
          ]
        },
        {
          id: "fdv-p4", name: "核心工作流 A/B (Week 4)", originalWeekStart: 4,
          tasks: [
            { id: "fdv-12", title: "构建会前准备 Workflow (Input->Summary)", mobile: false },
            { id: "fdv-13", title: "构建会后记录 Workflow (Data->CaseNote)", mobile: false },
            { id: "fdv-14", title: "测试完整闭环 (生成一份 Case Note)", mobile: false }
          ]
        },
        {
          id: "fdv-p5", name: "深度自动化 C-G (Week 5)", originalWeekStart: 5,
          tasks: [
            { id: "fdv-15", title: "实现 Risk Assessment 自动评分逻辑", mobile: false },
            { id: "fdv-16", title: "实现 Safety Plan 生成 (PDF导出)", mobile: false },
            { id: "fdv-17", title: "实现 Referral Email 自动草拟", mobile: true }
          ]
        },
        {
          id: "fdv-p6", name: "Agent 编排 (Week 6)", originalWeekStart: 6,
          tasks: [
            { id: "fdv-18", title: "设计统一路由逻辑 (Router)", mobile: false },
            { id: "fdv-19", title: "实现 Supervisor 审核机制 (High Risk拦截)", mobile: false },
            { id: "fdv-20", title: "多 Agent 并行测试", mobile: false }
          ]
        },
        {
          id: "fdv-p7", name: "前端 Demo (Week 7)", originalWeekStart: 7,
          tasks: [
            { id: "fdv-21", title: "搭建 Client Search 界面", mobile: false },
            { id: "fdv-22", title: "对接 Dify API / Embed UI", mobile: false },
            { id: "fdv-23", title: "手机端适配测试 (Supervisor Dashboard)", mobile: true }
          ]
        },
        {
          id: "fdv-p8", name: "测试与交付 (Week 8)", originalWeekStart: 8,
          tasks: [
            { id: "fdv-24", title: "高风险案例压力测试", mobile: false },
            { id: "fdv-25", title: "生成 Demo 视频", mobile: false },
            { id: "fdv-26", title: "整理 GitHub 代码库", mobile: false }
          ]
        }
      ]
    }
  ]
};

// --- 2. 辅助函数 ---

// 计算任务应该在哪一天完成 (Timeline Compression Algorithm)
const calculateTaskDate = (startDate, originalWeek, totalOriginalWeeks, deadlineDays) => {
  const start = new Date(startDate);
  // 压缩比率：例如 8周任务要塞进 48天 (约6.8周)
  const ratio = deadlineDays / (totalOriginalWeeks * 7);
  
  // 计算该任务大约在第几天
  const dayOffset = Math.floor((originalWeek - 1) * 7 * ratio); 
  
  const taskDate = new Date(start);
  taskDate.setDate(start.getDate() + dayOffset);
  return taskDate;
};

const formatDate = (date) => {
  return date.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric', weekday: 'short' });
};

const isToday = (dateStr) => {
  const today = new Date();
  const d = new Date(dateStr);
  return d.getDate() === today.getDate() && 
         d.getMonth() === today.getMonth() && 
         d.getFullYear() === today.getFullYear();
};

// --- 3. 主应用组件 ---

export default function MissionControl() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [data, setData] = useState(INITIAL_DATA);
  const [completionStatus, setCompletionStatus] = useState({});
  const [editingTask, setEditingTask] = useState(null); // ID of task being edited
  const [editValue, setEditValue] = useState("");

  // 初始化加载 (Local Storage)
  useEffect(() => {
    const savedStatus = localStorage.getItem('mission_control_status');
    const savedSettings = localStorage.getItem('mission_control_settings');
    
    if (savedStatus) setCompletionStatus(JSON.parse(savedStatus));
    if (savedSettings) {
      setData(prev => ({
        ...prev,
        settings: JSON.parse(savedSettings)
      }));
    }
  }, []);

  // 保存状态
  const toggleTask = (taskId) => {
    const newStatus = {
      ...completionStatus,
      [taskId]: !completionStatus[taskId]
    };
    setCompletionStatus(newStatus);
    localStorage.setItem('mission_control_status', JSON.stringify(newStatus));
  };

  // 更新设置
  const updateSetting = (key, value) => {
    const newData = {
      ...data,
      settings: { ...data.settings, [key]: value }
    };
    setData(newData);
    localStorage.setItem('mission_control_settings', JSON.stringify(newData.settings));
  };

  // 编辑任务文本
  const startEdit = (task) => {
    setEditingTask(task.id);
    setEditValue(task.title);
  };

  const saveEdit = (projectId, phaseId, taskId) => {
    const newProjects = data.projects.map(p => {
      if (p.id !== projectId) return p;
      return {
        ...p,
        phases: p.phases.map(ph => {
          if (ph.id !== phaseId) return ph;
          return {
            ...ph,
            tasks: ph.tasks.map(t => {
              if (t.id !== taskId) return t;
              return { ...t, title: editValue };
            })
          };
        })
      };
    });
    
    setData({ ...data, projects: newProjects });
    setEditingTask(null);
    // 注意：这里实际项目中需要保存 data 到 LocalStorage 或 数据库
  };

  // --- 子视图组件 ---

  const TaskItem = ({ task, date, projectColor, projectId, phaseId }) => (
    <div className={`flex items-start gap-3 p-3 rounded-xl border transition-all ${
      completionStatus[task.id] 
        ? 'bg-slate-50 border-slate-200 opacity-60' 
        : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'
    }`}>
      <button onClick={() => toggleTask(task.id)} className="pt-1">
        {completionStatus[task.id] ? 
          <CheckCircle2 className="w-5 h-5 text-green-500" /> : 
          <Circle className="w-5 h-5 text-slate-300 hover:text-blue-500" />
        }
      </button>
      
      <div className="flex-1">
        {editingTask === task.id ? (
          <div className="flex gap-2">
            <input 
              value={editValue} 
              onChange={(e) => setEditValue(e.target.value)}
              className="flex-1 border rounded px-2 py-1 text-sm"
              autoFocus
            />
            <button onClick={() => saveEdit(projectId, phaseId, task.id)} className="p-1 bg-blue-100 rounded text-blue-600">
              <Save size={14} />
            </button>
          </div>
        ) : (
          <div onClick={() => startEdit(task)} className="cursor-pointer group">
            <div className={`text-sm font-medium ${completionStatus[task.id] ? 'line-through text-slate-500' : 'text-slate-800'}`}>
              {task.title}
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className={`text-xs px-2 py-0.5 rounded-full text-white ${projectColor}`}>
                {formatDate(date)}
              </span>
              {task.mobile && (
                <span className="flex items-center gap-1 text-xs text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full">
                  <Smartphone size={10} /> 手机可做
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const DashboardView = () => {
    // 收集“今天”和“过期”的任务
    const today = new Date();
    let todaysTasks = [];
    let progressStats = [];

    data.projects.forEach(p => {
      let completed = 0;
      let total = 0;

      p.phases.forEach(ph => {
        ph.tasks.forEach(t => {
          total++;
          if (completionStatus[t.id]) completed++;

          const tDate = calculateTaskDate(data.settings.startDate, ph.originalWeekStart, p.totalOriginalWeeks, data.settings.deadlineDays);
          
          // 逻辑：如果是今天，或者之前的任务没做完，都显示在Dashboard
          if (!completionStatus[t.id] && tDate <= today) {
            todaysTasks.push({ ...t, date: tDate, project: p, phaseId: ph.id });
          }
        });
      });
      progressStats.push({ name: p.name, completed, total, color: p.color });
    });

    // Sort by date desc
    todaysTasks.sort((a, b) => a.date - b.date);

    return (
      <div className="space-y-6">
        {/* Progress Cards */}
        <div className="grid grid-cols-2 gap-4">
          {progressStats.map((stat, idx) => (
            <div key={idx} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
              <div className="text-xs text-slate-500 mb-1">{stat.name}</div>
              <div className="flex items-end gap-2">
                <span className="text-2xl font-bold text-slate-800">{Math.round((stat.completed/stat.total)*100)}%</span>
                <span className="text-xs text-slate-400 mb-1">{stat.completed}/{stat.total}</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2">
                <div className={`h-1.5 rounded-full ${stat.color}`} style={{ width: `${(stat.completed/stat.total)*100}%` }}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Today's Focus */}
        <div>
          <h3 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2">
            <LayoutDashboard className="w-5 h-5 text-indigo-600" />
            今日战斗序列
          </h3>
          <div className="space-y-3">
            {todaysTasks.length === 0 ? (
              <div className="p-8 text-center bg-white rounded-2xl border border-dashed border-slate-300">
                <p className="text-slate-500">今日任务清空！享受生活吧 ☕</p>
              </div>
            ) : (
              todaysTasks.map(t => (
                <TaskItem 
                  key={t.id} 
                  task={t} 
                  date={t.date} 
                  projectColor={t.project.color} 
                  projectId={t.project.id}
                  phaseId={t.phaseId}
                />
              ))
            )}
          </div>
        </div>
      </div>
    );
  };

  const ProjectView = ({ projectId }) => {
    const project = data.projects.find(p => p.id === projectId);
    
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-800">{project.name}</h2>
          <span className={`text-xs text-white px-2 py-1 rounded ${project.color}`}>
            {project.totalOriginalWeeks} 周 ➔ 48 天
          </span>
        </div>

        <div className="space-y-6">
          {project.phases.map(phase => {
            const phaseDate = calculateTaskDate(data.settings.startDate, phase.originalWeekStart, project.totalOriginalWeeks, data.settings.deadlineDays);
            
            return (
              <div key={phase.id} className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
                <div className="bg-slate-50 px-4 py-3 border-b border-slate-100 flex justify-between items-center">
                  <span className="font-semibold text-slate-700">{phase.name}</span>
                  <span className="text-xs text-slate-500">
                    约 {formatDate(phaseDate)} 开始
                  </span>
                </div>
                <div className="p-3 space-y-2">
                  {phase.tasks.map(task => (
                     <TaskItem 
                      key={task.id} 
                      task={task} 
                      date={phaseDate} // 这里简单将phase开始时间作为任务时间，实际可细分
                      projectColor={project.color} 
                      projectId={project.id}
                      phaseId={phase.id}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const SettingsView = () => (
    <div className="bg-white rounded-2xl shadow-sm p-6 border border-slate-100">
      <h2 className="text-xl font-bold mb-6">Mission Settings</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">行动代号 (User Name)</label>
          <input 
            type="text" 
            value={data.settings.userName}
            onChange={(e) => updateSetting('userName', e.target.value)}
            className="w-full border rounded-lg p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">开始日期 (Start Date)</label>
          <input 
            type="date" 
            value={data.settings.startDate}
            onChange={(e) => updateSetting('startDate', e.target.value)}
            className="w-full border rounded-lg p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            冲刺周期 (天)
          </label>
          <div className="flex items-center gap-4">
            <input 
              type="number" 
              value={data.settings.deadlineDays}
              onChange={(e) => updateSetting('deadlineDays', parseInt(e.target.value))}
              className="w-24 border rounded-lg p-2"
            />
            <span className="text-sm text-slate-500">默认 48 天</span>
          </div>
        </div>

        <div className="pt-4 border-t">
          <p className="text-xs text-slate-500 mb-2">数据存储：当前使用浏览器本地存储</p>
          <button className="text-blue-600 text-sm font-medium flex items-center gap-1">
            <TrendingUp size={16} /> 开启云端同步 (需要配置数据库)
          </button>
        </div>
      </div>
    </div>
  );

  // --- 4. 布局框架 ---

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row max-w-6xl mx-auto md:p-6 shadow-2xl">
      
      {/* 侧边栏 / 底部导航栏 */}
      <div className="md:w-64 bg-white md:rounded-2xl md:mr-6 flex md:flex-col justify-around md:justify-start p-2 md:p-6 border-t md:border-t-0 border-slate-200 fixed bottom-0 w-full md:relative z-10">
        <div className="hidden md:block mb-8">
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">MISSION 48</h1>
          <p className="text-xs text-slate-500">Rosewood + FDV Protocol</p>
        </div>
        
        <button 
          onClick={() => setActiveTab('dashboard')}
          className={`p-3 rounded-xl flex items-center gap-3 transition-colors ${activeTab === 'dashboard' ? 'bg-indigo-50 text-indigo-600 font-bold' : 'text-slate-500 hover:bg-slate-50'}`}
        >
          <LayoutDashboard size={20} /> <span className="hidden md:inline">战况总览</span>
        </button>

        <button 
          onClick={() => setActiveTab('rosewood')}
          className={`p-3 rounded-xl flex items-center gap-3 transition-colors ${activeTab === 'rosewood' ? 'bg-amber-50 text-amber-600 font-bold' : 'text-slate-500 hover:bg-slate-50'}`}
        >
          <Briefcase size={20} /> <span className="hidden md:inline">Perth Rosewood</span>
        </button>

        <button 
          onClick={() => setActiveTab('fdv')}
          className={`p-3 rounded-xl flex items-center gap-3 transition-colors ${activeTab === 'fdv' ? 'bg-blue-50 text-blue-600 font-bold' : 'text-slate-500 hover:bg-slate-50'}`}
        >
          <Code2 size={20} /> <span className="hidden md:inline">FDV System</span>
        </button>

        <button 
          onClick={() => setActiveTab('settings')}
          className={`p-3 rounded-xl flex items-center gap-3 transition-colors ${activeTab === 'settings' ? 'bg-slate-100 text-slate-800 font-bold' : 'text-slate-500 hover:bg-slate-50'}`}
        >
          <Settings size={20} /> <span className="hidden md:inline">设置</span>
        </button>
      </div>

      {/* 主内容区 */}
      <div className="flex-1 p-4 pb-24 md:pb-4 md:p-0 overflow-y-auto">
        {/* Mobile Header */}
        <div className="md:hidden flex justify-between items-center mb-6">
          <h1 className="text-xl font-black text-slate-900">MISSION 48</h1>
          <div className="text-xs font-bold bg-indigo-600 text-white px-3 py-1 rounded-full">
            Day {Math.floor((new Date() - new Date(data.settings.startDate)) / (1000 * 60 * 60 * 24)) + 1}
          </div>
        </div>

        {/* Content Switcher */}
        {activeTab === 'dashboard' && <DashboardView />}
        {activeTab === 'rosewood' && <ProjectView projectId="rosewood" />}
        {activeTab === 'fdv' && <ProjectView projectId="fdv-system" />}
        {activeTab === 'settings' && <SettingsView />}

      </div>
    </div>
  );
}