import React, { useState } from 'react';
import { 
  User, 
  ShieldCheck, 
  Users, 
  Banknote, 
  ArrowUpRight, 
  History, 
  Gavel, 
  AlertCircle, 
  CheckCircle2, 
  TrendingUp, 
  Settings, 
  HeartHandshake, 
  ArrowDownCircle, 
  Activity, 
  CreditCard, 
  Receipt,
  Edit3
} from 'lucide-react';

/**
 * SISTEMA DE GESTÃO DE ASSOCIAÇÃO MÚTUA (BRL)
 * Atualização: Adicionada seção de configuração de mensalidade no painel Admin.
 */

const INITIAL_MOCK_DATA = {
  poolTotal: 45000.00,
  reserveFund: 12500.00,
  currentRound: 4,
  totalUsers: 100,
  nextDrawDate: "15/06/2024",
  benefitRequests: [
    { id: 1, user: "Carlos Oliveira", reason: "Emergência Médica", amount: 3500.00, status: "Pendente" },
    { id: 2, user: "Ana Souza", reason: "Reparo Residencial", amount: 1200.00, status: "Aprovado" },
  ],
  lastWinners: [
    { name: "Marcos Silva", amount: 45000.00, date: "15/05/2024", id: "REC-9921" },
    { name: "Juliana Costa", amount: 45000.00, date: "15/04/2024", id: "REC-8842" },
  ]
};

export default function App() {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [status, setStatus] = useState('idle');
  
  // Estados para valores editáveis
  const [monthlyContribution, setMonthlyContribution] = useState(500.00);
  const [tempMonthlyValue, setTempMonthlyValue] = useState(500.00);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const login = () => {
    setUser({ name: "Admin Geral", id: "ID-001" });
    setIsAdmin(true);
  };

  const handleAction = () => {
    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      setTimeout(() => setStatus('idle'), 2000);
    }, 1500);
  };

  const updateContribution = () => {
    setStatus('loading');
    setTimeout(() => {
      setMonthlyContribution(Number(tempMonthlyValue));
      setStatus('success');
      setTimeout(() => setStatus('idle'), 2000);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans">
      {/* Navigation */}
      <nav className="border-b border-slate-200 bg-white sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-blue-600 p-2.5 rounded-xl shadow-lg">
              <ShieldCheck className="text-white w-6 h-6" />
            </div>
            <div>
              <h1 className="text-slate-900 font-black text-xl tracking-tight">PORTAL<span className="text-blue-600">MÚTUO</span></h1>
              <p className="text-slate-400 text-[10px] uppercase tracking-widest font-bold">Gestão de Consórcio e Benefícios</p>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-2 bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button onClick={() => setActiveTab('dashboard')} className={`px-6 py-2 rounded-lg text-xs font-bold uppercase transition-all ${activeTab === 'dashboard' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}>Dashboard</button>
            {isAdmin && (
              <button onClick={() => setActiveTab('admin')} className={`px-6 py-2 rounded-lg text-xs font-bold uppercase transition-all ${activeTab === 'admin' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}>Gestão Master</button>
            )}
            <button onClick={() => setActiveTab('benefits')} className={`px-6 py-2 rounded-lg text-xs font-bold uppercase transition-all ${activeTab === 'benefits' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}>Solicitar Auxílio</button>
          </div>

          {!user ? (
            <button onClick={login} className="bg-slate-900 text-white font-bold py-3 px-8 rounded-2xl text-xs uppercase tracking-tighter hover:bg-blue-600 transition-all">Acessar Minha Conta</button>
          ) : (
            <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-2xl px-5 py-2.5 shadow-sm">
               <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <User className="w-4 h-4 text-blue-600" />
               </div>
               <span className="text-xs font-bold text-slate-700">{user.name}</span>
            </div>
          )}
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {activeTab === 'dashboard' && (
          <>
            <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
               <div>
                  <h2 className="text-3xl font-black text-slate-900 mb-2">Resumo da Associação</h2>
                  <p className="text-slate-500">Acompanhe o fundo comum e os próximos sorteios do grupo.</p>
               </div>
               <div className="flex gap-4">
                  <div className="bg-white border border-slate-200 p-4 rounded-2xl text-center shadow-sm">
                    <p className="text-[10px] text-slate-400 uppercase font-bold mb-1">Próximo Sorteio</p>
                    <p className="text-slate-900 font-bold">{INITIAL_MOCK_DATA.nextDrawDate}</p>
                  </div>
                  <div className="bg-blue-50 border border-blue-100 p-4 rounded-2xl text-center shadow-sm">
                    <p className="text-[10px] text-blue-400 uppercase font-bold mb-1">Seu Status</p>
                    <p className="text-blue-600 font-bold">EM DIA</p>
                  </div>
               </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white border border-slate-200 p-8 rounded-[2rem] shadow-sm relative overflow-hidden group hover:border-blue-400 transition-all">
                <div className="bg-blue-50 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                  <Banknote className="text-blue-600 w-6 h-6" />
                </div>
                <h3 className="text-slate-400 text-xs font-bold uppercase tracking-wider">Prêmio Estimado</h3>
                <p className="text-4xl font-black text-slate-900 mt-2">{formatCurrency(INITIAL_MOCK_DATA.poolTotal)}</p>
                <p className="text-blue-600 text-sm font-bold mt-2">Sorteio Rodada #{INITIAL_MOCK_DATA.currentRound}</p>
              </div>

              <div className="bg-white border border-slate-200 p-8 rounded-[2rem] shadow-sm relative overflow-hidden group hover:border-emerald-400 transition-all">
                <div className="bg-emerald-50 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                  <HeartHandshake className="text-emerald-600 w-6 h-6" />
                </div>
                <h3 className="text-slate-400 text-xs font-bold uppercase tracking-wider">Fundo de Reserva Atual</h3>
                <p className="text-4xl font-black text-slate-900 mt-2">{formatCurrency(INITIAL_MOCK_DATA.reserveFund)}</p>
                <p className="text-emerald-600 text-sm font-bold mt-2">Disponível para auxílios mútuos</p>
              </div>

              <div className="bg-slate-900 p-8 rounded-[2rem] shadow-xl flex flex-col justify-center text-white">
                <div className="flex items-center gap-4 mb-6">
                   <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                      <Users className="text-white w-6 h-6" />
                   </div>
                   <div>
                     <p className="font-bold text-lg">{INITIAL_MOCK_DATA.totalUsers} Associados</p>
                     <p className="text-slate-400 text-xs uppercase font-bold">Grupo #01 Completo</p>
                   </div>
                </div>
                <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-4 rounded-xl uppercase text-xs tracking-widest transition-all shadow-lg shadow-blue-600/20">Pagar Mensalidade: {formatCurrency(monthlyContribution)}</button>
              </div>
            </div>

            {/* Resto do dashboard mantido igual... */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div className="bg-white border border-slate-200 rounded-[2rem] p-10 shadow-sm">
                <h3 className="text-xl font-black text-slate-900 mb-8 uppercase flex items-center gap-2">
                  <Receipt className="text-blue-600" /> Histórico de Contemplados
                </h3>
                <div className="space-y-4">
                  {INITIAL_MOCK_DATA.lastWinners.map((winner, idx) => (
                    <div key={idx} className="flex items-center justify-between p-5 bg-slate-50 rounded-2xl border border-slate-100">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center font-bold text-slate-400 text-sm border border-slate-200">
                          #{idx + 1}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">{winner.name}</p>
                          <p className="text-slate-500 text-xs">{winner.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-black text-blue-600">{formatCurrency(winner.amount)}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase">{winner.id}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-[2rem] p-10 shadow-sm">
                <h3 className="text-xl font-black text-slate-900 mb-6 uppercase">Regras de Divisão</h3>
                <div className="space-y-6">
                   <div className="p-4 bg-slate-50 rounded-2xl flex items-center justify-between">
                     <span className="text-sm font-bold text-slate-600 italic">Sorteio de Contemplação</span>
                     <span className="text-blue-600 font-black">75%</span>
                   </div>
                   <div className="p-4 bg-slate-50 rounded-2xl flex items-center justify-between">
                     <span className="text-sm font-bold text-slate-600 italic">Reserva de Ajuda Mútua</span>
                     <span className="text-emerald-600 font-black">20%</span>
                   </div>
                   <div className="p-4 bg-slate-50 rounded-2xl flex items-center justify-between">
                     <span className="text-sm font-bold text-slate-600 italic">Taxa Administrativa</span>
                     <span className="text-slate-400 font-black">5%</span>
                   </div>
                </div>
              </div>
            </section>
          </>
        )}

        {activeTab === 'admin' && isAdmin && (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
             <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                   <h2 className="text-3xl font-black text-slate-900 mb-2 underline decoration-blue-600">Gestão Master da Associação</h2>
                   <p className="text-slate-500 font-medium">Controle financeiro, sorteios e configurações do grupo.</p>
                </div>
             </header>

             <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Draw Control */}
                <section className="bg-white border border-slate-200 rounded-[2rem] p-10 shadow-sm">
                   <h3 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-3">
                      <Settings className="text-blue-600" /> Central de Sorteio
                   </h3>
                   <div className="p-8 bg-slate-50 rounded-[2rem] border border-slate-100 mb-6 text-center">
                      <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-2">Prêmio da Rodada</p>
                      <p className="text-5xl font-black text-slate-900 mb-8">{formatCurrency(INITIAL_MOCK_DATA.poolTotal)}</p>
                      <div className="flex gap-4">
                         <button onClick={handleAction} className="flex-1 bg-blue-600 text-white font-black py-4 rounded-2xl uppercase text-xs shadow-lg shadow-blue-600/20 hover:bg-blue-500">Realizar Sorteio Agora</button>
                         <button className="flex-1 bg-white border border-slate-200 text-slate-600 font-black py-4 rounded-2xl uppercase text-xs hover:bg-slate-50">Adiar Data</button>
                      </div>
                   </div>
                </section>

                {/* NOVO: Configuração de Mensalidade */}
                <section className="bg-white border border-slate-200 rounded-[2rem] p-10 shadow-sm">
                   <h3 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-3">
                      <Edit3 className="text-blue-600" /> Configuração do Grupo
                   </h3>
                   <div className="p-8 bg-blue-50/50 rounded-[2rem] border border-blue-100 mb-6">
                      <label className="text-[10px] font-black text-slate-400 uppercase mb-4 block tracking-widest text-center">Valor da Mensalidade Atual</label>
                      <div className="text-center mb-8">
                        <span className="text-4xl font-black text-blue-600">{formatCurrency(monthlyContribution)}</span>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">R$</span>
                          <input 
                            type="number" 
                            value={tempMonthlyValue}
                            onChange={(e) => setTempMonthlyValue(e.target.value)}
                            className="w-full bg-white border border-slate-200 rounded-xl p-4 pl-10 text-slate-700 font-black focus:ring-2 focus:ring-blue-500 outline-none" 
                            placeholder="Novo valor"
                          />
                        </div>
                        <button 
                          onClick={updateContribution}
                          disabled={status === 'loading'}
                          className="w-full bg-slate-900 text-white font-black py-4 rounded-xl uppercase text-xs tracking-widest hover:bg-blue-600 transition-all flex items-center justify-center gap-2"
                        >
                          {status === 'loading' ? 'Processando...' : (status === 'success' ? <CheckCircle2 className="w-4 h-4" /> : 'Atualizar Valor da Mensalidade')}
                        </button>
                      </div>
                   </div>
                   <div className="px-4 text-center">
                     <p className="text-[10px] text-slate-400 font-bold uppercase leading-tight">
                       A alteração afetará as próximas cobranças e o cálculo do fundo de reserva.
                     </p>
                   </div>
                </section>
             </div>

             {/* Fund Manipulation */}
             <section className="bg-slate-900 text-white rounded-[2rem] p-10 shadow-2xl relative overflow-hidden">
                <div className="relative z-10">
                  <h3 className="text-2xl font-black mb-8">Gestão de Tesouraria</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                     <div className="bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-sm">
                        <h4 className="text-[10px] font-black text-slate-400 uppercase mb-4 tracking-widest">Aporte Extra no Sorteio</h4>
                        <input type="text" placeholder="Valor R$" className="w-full bg-slate-800 border-none rounded-lg p-3 text-white mb-4 text-sm" />
                        <button className="w-full bg-blue-600 text-white font-black py-3 rounded-lg text-[10px] uppercase">Mover da Reserva</button>
                     </div>
                     <div className="bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-sm text-center flex flex-col justify-center">
                        <TrendingUp className="text-blue-500 w-10 h-10 mx-auto mb-4" />
                        <p className="text-xs text-slate-400 px-4 leading-relaxed font-medium">Você pode bonificar o prêmio do mês utilizando fundos excedentes da reserva.</p>
                     </div>
                     <div className="bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-sm">
                        <h4 className="text-[10px] font-black text-slate-400 uppercase mb-4 tracking-widest">Taxa Administrativa Acumulada</h4>
                        <p className="text-3xl font-black text-white mb-1">R$ 2.250,00</p>
                        <p className="text-[10px] text-slate-500 mb-6 font-bold uppercase">Disponível para Resgate</p>
                        <button className="w-full bg-white text-slate-900 font-black py-3 rounded-lg text-[10px] uppercase hover:bg-blue-100">Sacar para Empresa</button>
                     </div>
                  </div>
                </div>
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] -mr-40 -mt-40"></div>
             </section>
          </div>
        )}

        {/* Tab de benefícios mantida igual... */}
        {activeTab === 'benefits' && (
          <div className="max-w-3xl mx-auto space-y-12 py-10 animate-in fade-in duration-500">
             <header className="text-center">
                <div className="w-20 h-20 bg-emerald-100 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                   <HeartHandshake className="w-10 h-10 text-emerald-600" />
                </div>
                <h2 className="text-4xl font-black text-slate-900 mb-2 tracking-tight">Solicitação de Ajuda Mútua</h2>
                <p className="text-slate-500 max-w-md mx-auto">Como associado ativo, você pode solicitar suporte financeiro do fundo de reserva em situações imprevistas.</p>
             </header>

             <div className="bg-white border border-slate-200 rounded-[2.5rem] p-12 shadow-sm relative overflow-hidden">
                <h3 className="text-xl font-black text-slate-900 mb-8 uppercase">Formulário de Pedido</h3>
                <form className="space-y-8">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                         <label className="text-[10px] font-black text-slate-400 uppercase mb-3 block tracking-widest">Motivo da Solicitação</label>
                         <select className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-slate-700 font-medium focus:ring-2 focus:ring-blue-500 outline-none">
                            <option>Emergência Médica</option>
                            <option>Reparo de Veículo Associado</option>
                            <option>Assistência Familiar Emergencial</option>
                            <option>Sinistro Residencial</option>
                            <option>Outros</option>
                         </select>
                      </div>
                      <div>
                         <label className="text-[10px] font-black text-slate-400 uppercase mb-3 block tracking-widest">Quantia Solicitada (R$)</label>
                         <input type="number" step="100" className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-slate-700 font-medium focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Ex: 1500" />
                      </div>
                   </div>
                   <button type="button" onClick={handleAction} className="w-full bg-blue-600 text-white font-black py-6 rounded-2xl uppercase tracking-[0.2em] text-sm shadow-xl shadow-blue-600/20 hover:bg-blue-500 hover:scale-[1.01] transition-all">
                      {status === 'loading' ? 'Enviando...' : 'Enviar para Análise do Comitê'}
                   </button>
                </form>
             </div>
          </div>
        )}
      </main>

      <footer className="border-t border-slate-200 bg-white py-16 mt-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.4em]">Protocolo de Gestão Mutualista Digital • 2024</p>
        </div>
      </footer>
    </div>
  );
}