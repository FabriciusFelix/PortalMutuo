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
  Edit3,
  LogOut,
  Lock
} from 'lucide-react';

/**
 * SISTEMA DE GESTÃO DE ASSOCIAÇÃO MÚTUA (BRL)
 * Atualização: Sistema de Login com níveis de acesso (Admin/User).
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
  // Estados de Autenticação
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');

  // Estados da Interface
  const [activeTab, setActiveTab] = useState('dashboard');
  const [status, setStatus] = useState('idle');
  
  // Estados de Configuração
  const [monthlyContribution, setMonthlyContribution] = useState(500.00);
  const [tempMonthlyValue, setTempMonthlyValue] = useState(500.00);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError('');

    if (loginData.username === 'admin' && loginData.password === 'admin') {
      setUser({ name: "Administrador Master", role: "admin" });
      setIsAdmin(true);
      setActiveTab('dashboard');
    } else if (loginData.username === 'user' && loginData.password === 'user') {
      setUser({ name: "Usuário Comum", role: "user" });
      setIsAdmin(false);
      setActiveTab('dashboard');
    } else {
      setLoginError('Credenciais inválidas. Tente admin/admin ou user/user.');
    }
  };

  const handleLogout = () => {
    setUser(null);
    setIsAdmin(false);
    setLoginData({ username: '', password: '' });
    setActiveTab('dashboard');
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

  // Tela de Login
  if (!user) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-6 font-sans">
        <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl p-10 border border-slate-100">
          <div className="flex flex-col items-center mb-10">
            <div className="bg-blue-600 p-4 rounded-2xl shadow-xl mb-4">
              <ShieldCheck className="text-white w-8 h-8" />
            </div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight text-center">PORTAL<span className="text-blue-600">MÚTUO</span></h1>
            <p className="text-slate-400 text-xs uppercase font-bold tracking-widest mt-1">Gestão de Associação</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Usuário</label>
              <input 
                type="text" 
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-slate-700 font-bold focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                placeholder="Ex: admin"
                value={loginData.username}
                onChange={(e) => setLoginData({...loginData, username: e.target.value})}
              />
            </div>
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Senha</label>
              <input 
                type="password" 
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-slate-700 font-bold focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                placeholder="••••••••"
                value={loginData.password}
                onChange={(e) => setLoginData({...loginData, password: e.target.value})}
              />
            </div>

            {loginError && (
              <div className="bg-red-50 border border-red-100 p-4 rounded-xl flex items-center gap-3 text-red-600 text-xs font-bold">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {loginError}
              </div>
            )}

            <button type="submit" className="w-full bg-slate-900 text-white font-black py-4 rounded-2xl uppercase text-xs tracking-widest hover:bg-blue-600 transition-all shadow-xl shadow-slate-900/10 active:scale-[0.98]">
              Entrar no Sistema
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-slate-100 text-center">
            <p className="text-[10px] text-slate-400 font-bold uppercase mb-2 tracking-widest">Dicas de Acesso</p>
            <div className="flex justify-center gap-4 text-[10px] text-slate-500 font-medium">
              <span>Admin: <strong className="text-slate-800">admin / admin</strong></span>
              <span>User: <strong className="text-slate-800">user / user</strong></span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Interface Principal (App Logado)
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
              <h1 className="text-slate-900 font-black text-xl tracking-tight italic">PORTAL<span className="text-blue-600">MÚTUO</span></h1>
              <p className="text-slate-400 text-[10px] uppercase tracking-widest font-bold">Acesso {isAdmin ? 'Master' : 'Membro'}</p>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-2 bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button onClick={() => setActiveTab('dashboard')} className={`px-6 py-2 rounded-lg text-xs font-bold uppercase transition-all ${activeTab === 'dashboard' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}>Dashboard</button>
            {isAdmin && (
              <button onClick={() => setActiveTab('admin')} className={`px-6 py-2 rounded-lg text-xs font-bold uppercase transition-all ${activeTab === 'admin' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}>Gestão Master</button>
            )}
            <button onClick={() => setActiveTab('benefits')} className={`px-6 py-2 rounded-lg text-xs font-bold uppercase transition-all ${activeTab === 'benefits' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}>Solicitar Auxílio</button>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-3 bg-white border border-slate-200 rounded-2xl px-5 py-2.5 shadow-sm">
               <div className={`w-8 h-8 rounded-full ${isAdmin ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-600'} flex items-center justify-center`}>
                  <User className="w-4 h-4" />
               </div>
               <div className="flex flex-col">
                 <span className="text-xs font-bold text-slate-700 leading-none">{user.name}</span>
                 <span className="text-[9px] text-slate-400 uppercase font-black">{isAdmin ? 'Nível 1' : 'Nível 2'}</span>
               </div>
            </div>
            <button 
              onClick={handleLogout}
              className="p-3 bg-slate-50 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl border border-slate-200 transition-all"
              title="Sair"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {activeTab === 'dashboard' && (
          <>
            <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
               <div>
                  <h2 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">Painel do Associado</h2>
                  <p className="text-slate-500">Transparência total no fundo mútuo de benefícios.</p>
               </div>
               <div className="flex gap-4">
                  <div className="bg-white border border-slate-200 p-4 rounded-2xl text-center shadow-sm min-w-[140px]">
                    <p className="text-[10px] text-slate-400 uppercase font-bold mb-1">Próximo Sorteio</p>
                    <p className="text-slate-900 font-bold">{INITIAL_MOCK_DATA.nextDrawDate}</p>
                  </div>
                  <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-2xl text-center shadow-sm min-w-[140px]">
                    <p className="text-[10px] text-emerald-500 uppercase font-bold mb-1">Seu Status</p>
                    <p className="text-emerald-600 font-bold">PAGAMENTO EM DIA</p>
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
                <h3 className="text-slate-400 text-xs font-bold uppercase tracking-wider">Reserva Ajuda Mútua</h3>
                <p className="text-4xl font-black text-slate-900 mt-2">{formatCurrency(INITIAL_MOCK_DATA.reserveFund)}</p>
                <p className="text-emerald-600 text-sm font-bold mt-2">Disponível para auxílios emergenciais</p>
              </div>

              <div className="bg-slate-900 p-8 rounded-[2rem] shadow-xl flex flex-col justify-center text-white relative overflow-hidden group">
                <div className="flex items-center gap-4 mb-6 relative z-10">
                   <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                      <Users className="text-white w-6 h-6" />
                   </div>
                   <div>
                     <p className="font-bold text-lg">{INITIAL_MOCK_DATA.totalUsers} Associados</p>
                     <p className="text-slate-400 text-[10px] uppercase font-bold">Grupo #01 • Vagas ESGOTADAS</p>
                   </div>
                </div>
                <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-4 rounded-xl uppercase text-xs tracking-widest transition-all shadow-lg shadow-blue-600/20 relative z-10">
                  Mensalidade: {formatCurrency(monthlyContribution)}
                </button>
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
              </div>
            </div>

            <section className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div className="bg-white border border-slate-200 rounded-[2rem] p-10 shadow-sm">
                <h3 className="text-xl font-black text-slate-900 mb-8 uppercase flex items-center gap-3">
                  <Receipt className="text-blue-600 w-5 h-5" /> Histórico de Contemplados
                </h3>
                <div className="space-y-4">
                  {INITIAL_MOCK_DATA.lastWinners.map((winner, idx) => (
                    <div key={idx} className="flex items-center justify-between p-5 bg-slate-50 rounded-2xl border border-slate-100">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center font-bold text-slate-400 text-sm border border-slate-200">
                          #{INITIAL_MOCK_DATA.currentRound - idx - 1}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">{winner.name}</p>
                          <p className="text-slate-500 text-[10px] uppercase font-bold">{winner.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-black text-blue-600 leading-none">{formatCurrency(winner.amount)}</p>
                        <p className="text-[9px] text-slate-400 font-bold uppercase mt-1">REC-ID: {winner.id}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-[2rem] p-10 shadow-sm">
                <h3 className="text-xl font-black text-slate-900 mb-8 uppercase flex items-center gap-3">
                  <Activity className="text-blue-600 w-5 h-5" /> Regras de Alocação
                </h3>
                <div className="space-y-6">
                   <div className="flex flex-col gap-2">
                     <div className="flex justify-between items-end">
                       <span className="text-xs font-bold text-slate-500 uppercase">Sorteio de Contemplação</span>
                       <span className="text-blue-600 font-black">75%</span>
                     </div>
                     <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                       <div className="w-[75%] h-full bg-blue-600"></div>
                     </div>
                   </div>
                   <div className="flex flex-col gap-2">
                     <div className="flex justify-between items-end">
                       <span className="text-xs font-bold text-slate-500 uppercase">Reserva de Ajuda Mútua</span>
                       <span className="text-emerald-500 font-black">20%</span>
                     </div>
                     <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                       <div className="w-[20%] h-full bg-emerald-500"></div>
                     </div>
                   </div>
                   <div className="flex flex-col gap-2">
                     <div className="flex justify-between items-end">
                       <span className="text-xs font-bold text-slate-500 uppercase">Taxa Administrativa</span>
                       <span className="text-slate-400 font-black">5%</span>
                     </div>
                     <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                       <div className="w-[5%] h-full bg-slate-400"></div>
                     </div>
                   </div>
                </div>
                <div className="mt-10 p-5 bg-blue-50 border border-blue-100 rounded-2xl flex gap-4">
                  <AlertCircle className="text-blue-600 w-5 h-5 flex-shrink-0 mt-0.5" />
                  <p className="text-[11px] text-blue-800 leading-relaxed font-medium">
                    A estrutura de divisão é fixa e garantida por auditoria trimestral. Em caso de mudanças, uma votação será aberta para todos os associados.
                  </p>
                </div>
              </div>
            </section>
          </>
        )}

        {activeTab === 'admin' && isAdmin && (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
             <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                   <h2 className="text-3xl font-black text-slate-900 mb-2 underline decoration-blue-600">Gestão Master</h2>
                   <p className="text-slate-500 font-medium tracking-tight">Painel restrito para controle financeiro e configurações estratégicas.</p>
                </div>
                <div className="flex gap-4">
                  <div className="bg-red-50 border border-red-100 px-4 py-2 rounded-xl text-red-600 flex items-center gap-2 text-[10px] font-black uppercase">
                    <Lock className="w-3 h-3" /> Acesso de Segurança Nível 1
                  </div>
                </div>
             </header>

             <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Draw Control */}
                <section className="bg-white border border-slate-200 rounded-[2rem] p-10 shadow-sm">
                   <h3 className="text-lg font-black text-slate-900 mb-8 flex items-center gap-3 uppercase">
                      <Settings className="text-blue-600 w-5 h-5" /> Processamento de Sorteio
                   </h3>
                   <div className="p-8 bg-slate-50 rounded-[2rem] border border-slate-100 mb-6 text-center">
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-2">Montante Acumulado</p>
                      <p className="text-5xl font-black text-slate-900 mb-8">{formatCurrency(INITIAL_MOCK_DATA.poolTotal)}</p>
                      <div className="flex gap-4">
                         <button onClick={handleAction} className="flex-1 bg-blue-600 text-white font-black py-4 rounded-2xl uppercase text-xs shadow-lg shadow-blue-600/20 hover:bg-blue-500 transition-all active:scale-[0.98]">Realizar Sorteio Manual</button>
                         <button className="flex-1 bg-white border border-slate-200 text-slate-600 font-black py-4 rounded-2xl uppercase text-xs hover:bg-slate-50 transition-all">Relatório Rodada</button>
                      </div>
                   </div>
                   <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400 font-black uppercase tracking-widest">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div> Servidor de Sorteio Online
                   </div>
                </section>

                {/* Configuração de Mensalidade */}
                <section className="bg-white border border-slate-200 rounded-[2rem] p-10 shadow-sm">
                   <h3 className="text-lg font-black text-slate-900 mb-8 flex items-center gap-3 uppercase">
                      <Edit3 className="text-blue-600 w-5 h-5" /> Configurações de Fundo
                   </h3>
                   <div className="p-8 bg-blue-50/50 rounded-[2rem] border border-blue-100 mb-6">
                      <label className="text-[10px] font-black text-slate-400 uppercase mb-4 block tracking-widest text-center">Custo de Adesão (Mensalidade)</label>
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
                            className="w-full bg-white border border-slate-200 rounded-xl p-4 pl-10 text-slate-700 font-black focus:ring-2 focus:ring-blue-500 outline-none transition-all" 
                            placeholder="Ex: 500"
                          />
                        </div>
                        <button 
                          onClick={updateContribution}
                          disabled={status === 'loading'}
                          className="w-full bg-slate-900 text-white font-black py-4 rounded-xl uppercase text-xs tracking-widest hover:bg-blue-600 transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
                        >
                          {status === 'loading' ? 'Sincronizando...' : (status === 'success' ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : 'Salvar Novo Valor')}
                        </button>
                      </div>
                   </div>
                </section>
             </div>

             {/* Tesouraria Master */}
             <section className="bg-slate-900 text-white rounded-[2.5rem] p-12 shadow-2xl relative overflow-hidden">
                <div className="relative z-10">
                  <h3 className="text-2xl font-black mb-10 flex items-center gap-3 uppercase tracking-tighter italic">
                    <Banknote className="text-blue-500 w-8 h-8" /> Tesouraria Corporativa
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                     <div className="bg-white/5 p-8 rounded-[2rem] border border-white/10 backdrop-blur-sm">
                        <h4 className="text-[10px] font-black text-slate-400 uppercase mb-4 tracking-widest">Injeção de Capital Extra</h4>
                        <input type="text" placeholder="R$ 0,00" className="w-full bg-slate-800 border-none rounded-xl p-4 text-white mb-4 text-sm font-bold" />
                        <button className="w-full bg-blue-600 text-white font-black py-4 rounded-xl text-[10px] uppercase tracking-widest hover:bg-blue-500 transition-all">Bonificar Sorteio</button>
                     </div>
                     <div className="bg-white/5 p-8 rounded-[2rem] border border-white/10 backdrop-blur-sm text-center flex flex-col justify-center items-center">
                        <div className="bg-blue-600/20 p-4 rounded-full mb-4">
                           <TrendingUp className="text-blue-500 w-8 h-8" />
                        </div>
                        <p className="text-xs text-slate-300 px-2 leading-relaxed font-bold uppercase tracking-tighter">Utilize este painel para mover fundos entre a reserva e o pote principal.</p>
                     </div>
                     <div className="bg-white/5 p-8 rounded-[2rem] border border-white/10 backdrop-blur-sm flex flex-col justify-between">
                        <div>
                           <h4 className="text-[10px] font-black text-slate-400 uppercase mb-2 tracking-widest">Saldo Adm Disponível</h4>
                           <p className="text-4xl font-black text-white">R$ 2.250,00</p>
                        </div>
                        <button className="w-full bg-white text-slate-900 font-black py-4 rounded-xl text-[10px] uppercase tracking-widest hover:bg-blue-100 transition-all mt-6">Resgatar Lucro</button>
                     </div>
                  </div>
                </div>
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] -mr-40 -mt-40"></div>
             </section>
          </div>
        )}

        {activeTab === 'benefits' && (
          <div className="max-w-3xl mx-auto space-y-12 py-10 animate-in fade-in duration-500">
             <header className="text-center">
                <div className="w-20 h-20 bg-emerald-100 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-sm">
                   <HeartHandshake className="w-10 h-10 text-emerald-600" />
                </div>
                <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Ajuda Mútua</h2>
                <p className="text-slate-500 max-w-md mx-auto font-medium">O fundo de reserva está aqui para te apoiar em momentos difíceis. Solicite uma análise do seu caso.</p>
             </header>

             <div className="bg-white border border-slate-200 rounded-[3rem] p-12 shadow-sm relative overflow-hidden">
                <h3 className="text-xl font-black text-slate-900 mb-8 uppercase text-center md:text-left">Formulário de Pedido</h3>
                <form className="space-y-8">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                         <label className="text-[10px] font-black text-slate-400 uppercase mb-3 block tracking-widest">Motivo Emergencial</label>
                         <select className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-slate-700 font-bold focus:ring-2 focus:ring-blue-500 outline-none appearance-none">
                            <option>Emergência Médica</option>
                            <option>Reparo de Veículo</option>
                            <option>Assistência Familiar</option>
                            <option>Sinistro Residencial</option>
                            <option>Outros</option>
                         </select>
                      </div>
                      <div>
                         <label className="text-[10px] font-black text-slate-400 uppercase mb-3 block tracking-widest">Valor do Auxílio (R$)</label>
                         <input type="number" step="100" className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-slate-700 font-bold focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Ex: 1500" />
                      </div>
                   </div>
                   <button type="button" onClick={handleAction} className="w-full bg-blue-600 text-white font-black py-6 rounded-2xl uppercase tracking-[0.2em] text-xs shadow-xl shadow-blue-600/20 hover:bg-blue-500 hover:scale-[1.01] transition-all active:scale-[0.98]">
                      {status === 'loading' ? 'Enviando Pedido...' : 'Enviar para Análise do Comitê Master'}
                   </button>
                </form>
             </div>
          </div>
        )}
      </main>

      <footer className="border-t border-slate-200 bg-white py-16 mt-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex justify-center gap-6 mb-8 opacity-40 grayscale">
             <div className="h-6 w-16 bg-slate-200 rounded-lg"></div>
             <div className="h-6 w-16 bg-slate-200 rounded-lg"></div>
             <div className="h-6 w-16 bg-slate-200 rounded-lg"></div>
          </div>
          <p className="text-slate-400 text-[9px] font-black uppercase tracking-[0.5em]">Segurança Bancária Digital • Protocolo 2024.1</p>
        </div>
      </footer>
    </div>
  );
}