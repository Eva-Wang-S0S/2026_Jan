import React, { useState } from 'react';
import { CheckCircle2, Circle, Calendar, DollarSign, Users, Package, TrendingUp } from 'lucide-react';

export default function ExecutionChecklist() {
  const [checkedItems, setCheckedItems] = useState({});

  const toggleItem = (id) => {
    setCheckedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const phases = [
    {
      phase: "Week 1-2: Foundation",
      icon: Package,
      color: "bg-blue-500",
      tasks: [
        { id: "w1-1", task: "Register domain: PerthRosewood.com.au", owner: "You", cost: "$15-25" },
        { id: "w1-2", task: "Sign up Shopify (14-day trial)", owner: "You", cost: "$0 (then $39/mo)" },
        { id: "w1-3", task: "Install Abode theme + copy website content", owner: "You", cost: "$0" },
        { id: "w1-4", task: "Contact 3-5 factories with sample order email", owner: "Parents", cost: "$0" },
        { id: "w1-5", task: "Order ONE sample product (6-seater dining set)", owner: "Parents", cost: "$1,500-2,500" },
        { id: "w1-6", task: "Create Instagram + Facebook business accounts", owner: "You", cost: "$0" },
        { id: "w1-7", task: "Join 5 Perth Facebook groups for research", owner: "You", cost: "$0" },
        { id: "w2-1", task: "Post market survey in Facebook groups", owner: "You", cost: "$0" },
        { id: "w2-2", task: "Get freight quotes from 3 forwarders", owner: "You + Parents", cost: "$0" },
        { id: "w2-3", task: "Schedule 6 Instagram posts for next 2 weeks", owner: "You", cost: "$0" },
      ]
    },
    {
      phase: "Week 3-4: Launch Ads",
      icon: TrendingUp,
      color: "bg-green-500",
      tasks: [
        { id: "w3-1", task: "Install Meta Pixel on website", owner: "You", cost: "$0" },
        { id: "w3-2", task: "Create 4 ad creatives (price, craft, B/A, testimonial)", owner: "You", cost: "$0" },
        { id: "w3-3", task: "Launch Week 1 ads ($200 budget)", owner: "You", cost: "$200" },
        { id: "w3-4", task: "Monitor daily, pause underperformers by Day 3", owner: "You", cost: "$0" },
        { id: "w4-1", task: "Scale winning ads (Week 2: $250)", owner: "You", cost: "$250" },
        { id: "w4-2", task: "Set up retargeting campaign", owner: "You", cost: "$0" },
        { id: "w4-3", task: "Respond to all leads within 12 hours", owner: "You", cost: "$0" },
        { id: "w4-4", task: "Book 5-10 consultation calls", owner: "You", cost: "$0" },
      ]
    },
    {
      phase: "Week 5-8: First Sales",
      icon: DollarSign,
      color: "bg-amber-500",
      tasks: [
        { id: "w6-1", task: "Sample arrives in Perth (Week 6)", owner: "Parents ship", cost: "$400-600 freight" },
        { id: "w6-2", task: "Hire photographer for product shots", owner: "You", cost: "$200-400" },
        { id: "w6-3", task: "Update website with real photos", owner: "You", cost: "$0" },
        { id: "w6-4", task: "Offer 'Founding Customer' discount (20% off first 3)", owner: "You", cost: "Margin sacrifice" },
        { id: "w7-1", task: "Convert 1-2 leads to paying customers", owner: "You", cost: "$0" },
        { id: "w7-2", task: "Process first deposit payments", owner: "You", cost: "$0" },
        { id: "w8-1", task: "Place bulk order with factory (5-10 pieces)", owner: "Parents", cost: "$8K-15K" },
        { id: "w8-2", task: "Document first customer delivery for case study", owner: "You", cost: "$0" },
      ]
    },
    {
      phase: "Month 3: Scale & Optimize",
      icon: Users,
      color: "bg-purple-500",
      tasks: [
        { id: "m3-1", task: "Increase ad budget to $500-1000/month", owner: "You", cost: "$500-1000" },
        { id: "m3-2", task: "Complete 10-15 orders", owner: "You + Parents", cost: "Inventory" },
        { id: "m3-3", task: "Collect 3-5 five-star reviews", owner: "You", cost: "$0" },
        { id: "m3-4", task: "Partner with 2-3 interior designers/carpenters", owner: "You", cost: "$0" },
        { id: "m3-5", task: "Expand product line to 15-20 SKUs", owner: "Parents", cost: "Samples" },
        { id: "m3-6", task: "Test Sydney market with $200 ad spend", owner: "You", cost: "$200" },
      ]
    },
  ];

  const calculateProgress = () => {
    const total = phases.reduce((sum, phase) => sum + phase.tasks.length, 0);
    const completed = Object.values(checkedItems).filter(Boolean).length;
    return Math.round((completed / total) * 100);
  };

  const progress = calculateProgress();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Perth Rosewood - 90天执行清单
          </h1>
          <p className="text-slate-600 text-lg mb-6">
            从零到第一笔订单的完整路线图。勾选完成的任务,追踪你的进度。
          </p>
          
          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex justify-between text-sm text-slate-600 mb-2">
              <span>总体进度</span>
              <span className="font-bold">{progress}% 完成</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-4 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-blue-500 to-green-500 h-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-4 gap-4 mt-6">
            <div className="bg-blue-50 p-4 rounded-xl">
              <div className="text-2xl font-bold text-blue-700">
                {Object.values(checkedItems).filter(Boolean).length}
              </div>
              <div className="text-sm text-blue-600">任务完成</div>
            </div>
            <div className="bg-green-50 p-4 rounded-xl">
              <div className="text-2xl font-bold text-green-700">
                ${phases[0].tasks.reduce((sum, t) => {
                  const cost = t.cost.match(/\d+/);
                  return sum + (cost ? parseInt(cost[0]) : 0);
                }, 0)}
              </div>
              <div className="text-sm text-green-600">Week 1-2 预算</div>
            </div>
            <div className="bg-amber-50 p-4 rounded-xl">
              <div className="text-2xl font-bold text-amber-700">8-10周</div>
              <div className="text-sm text-amber-600">第一笔订单</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-xl">
              <div className="text-2xl font-bold text-purple-700">$40-60K</div>
              <div className="text-sm text-purple-600">Month 3 目标</div>
            </div>
          </div>
        </div>

        {/* Phase Checklists */}
        {phases.map((phase, phaseIndex) => {
          const PhaseIcon = phase.icon;
          const completed = phase.tasks.filter(t => checkedItems[t.id]).length;
          const total = phase.tasks.length;
          const phaseProgress = Math.round((completed / total) * 100);

          return (
            <div key={phaseIndex} className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className={`${phase.color} p-3 rounded-xl`}>
                    <PhaseIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">{phase.phase}</h2>
                    <p className="text-slate-600">{completed}/{total} 任务完成</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-slate-900">{phaseProgress}%</div>
                  <div className="text-sm text-slate-500">阶段进度</div>
                </div>
              </div>

              {/* Tasks */}
              <div className="space-y-3">
                {phase.tasks.map((task) => (
                  <div
                    key={task.id}
                    onClick={() => toggleItem(task.id)}
                    className={`
                      flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all
                      ${checkedItems[task.id]
                        ? 'bg-green-50 border-green-300'
                        : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                      }
                    `}
                  >
                    <div className="pt-0.5">
                      {checkedItems[task.id] ? (
                        <CheckCircle2 className="w-6 h-6 text-green-600" />
                      ) : (
                        <Circle className="w-6 h-6 text-slate-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className={`
                        font-medium
                        ${checkedItems[task.id] 
                          ? 'text-green-900 line-through' 
                          : 'text-slate-900'
                        }
                      `}>
                        {task.task}
                      </p>
                      <div className="flex gap-4 mt-2 text-sm">
                        <span className="text-slate-600">
                          <span className="font-semibold">负责人:</span> {task.owner}
                        </span>
                        <span className="text-slate-600">
                          <span className="font-semibold">成本:</span> {task.cost}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {/* Bottom CTA */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">
            {progress < 25 
              ? "💪 开始行动！第一步是最重要的。"
              : progress < 50
              ? "🚀 进展顺利！保持势头。"
              : progress < 75
              ? "⭐ 太棒了！你已经走了一大半。"
              : progress < 100
              ? "🏆 最后冲刺！胜利在望。"
              : "🎉 恭喜！你完成了90天计划！"
            }
          </h3>
          <p className="text-lg opacity-90 mb-6">
            记住: 成功的生意是一步步做出来的,不是想出来的。
          </p>
          <div className="flex gap-4 justify-center">
            <button className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
              查看完整执行指南
            </button>
            <button className="bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-800 transition">
              下载清单 (PDF)
            </button>
          </div>
        </div>

        {/* Footer Tips */}
        <div className="mt-8 bg-amber-50 border-2 border-amber-200 rounded-xl p-6">
          <h4 className="font-bold text-amber-900 mb-3">💡 专业提示:</h4>
          <ul className="space-y-2 text-amber-800">
            <li>• 每周日晚上回顾进度,计划下周任务</li>
            <li>• 遇到困难不要放弃——大部分创业者在第3-4个月放弃,你坚持就赢了</li>
            <li>• 把这个清单打印出来,贴在工作区,保持视觉提醒</li>
            <li>• 完成一个阶段后奖励自己——庆祝小胜利很重要</li>
            <li>• 记住: 你爸妈在中国的工厂是你最大的优势,别人无法复制</li>
          </ul>
        </div>
      </div>
    </div>
  );
}