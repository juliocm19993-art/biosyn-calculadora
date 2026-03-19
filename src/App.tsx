import React from "react";
import { Instagram, MessageCircle, Globe, Send } from "lucide-react";

export default function PeptideCalculator() {
  const [mgPeptideo, setMgPeptideo] = React.useState("10");
  const [mlAgua, setMlAgua] = React.useState("2");
  const [mcgDiario, setMcgDiario] = React.useState("500");

  const parseValue = (value: string) => {
    const parsed = Number(value.replace(",", "."));
    return Number.isFinite(parsed) ? parsed : 0;
  };

  const mg = parseValue(mgPeptideo);
  const ml = parseValue(mlAgua);
  const mcg = parseValue(mcgDiario);

  const ui = React.useMemo(() => {
    const c = mcg / 1000;
    if (!mg || !ml || !c || mg <= 0 || ml <= 0 || c <= 0) return 0;
    return (c * ml * 100) / mg;
  }, [mg, ml, mcg]);

  const uiPorMg = React.useMemo(() => {
    if (!mg || !ml || mg <= 0 || ml <= 0) return 0;
    return (ml * 100) / mg;
  }, [mg, ml]);

  const concentracao = React.useMemo(() => {
    if (!mg || !ml || mg <= 0 || ml <= 0) return 0;
    return mg / ml;
  }, [mg, ml]);

  const format = (value: number) => {
    if (!Number.isFinite(value)) return "0";
    return value.toLocaleString("pt-BR", {
      minimumFractionDigits: value % 1 === 0 ? 0 : 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#03150c] to-[#0a2417] p-6 text-white md:p-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex justify-center">
          <div className="relative">
            <img
              src="/logo-biosyn.png"
              alt="BioSyn Peptides"
              className="h-40 md:h-56 w-auto object-contain drop-shadow-[0_0_25px_rgba(16,185,129,0.35)]"
            />
            <div className="absolute inset-0 -z-10 rounded-full bg-emerald-400 opacity-20 blur-3xl"></div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-emerald-400/15 bg-white/[0.04] p-6 shadow-2xl backdrop-blur-xl md:p-8">
            <h2 className="mb-6 text-xl font-semibold">Dados da mistura</h2>

            <div className="space-y-5">
              <div>
                <label className="mb-2 block text-sm text-slate-300">
                  Peptídeo
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.01"
                    value={mgPeptideo}
                    onChange={(e) => setMgPeptideo(e.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-4 pr-14 text-lg outline-none transition focus:border-emerald-400"
                    placeholder="Ex: 10"
                  />
                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-emerald-100/60">
                    MG
                  </span>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm text-slate-300">
                  Água Bacteriostática
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.01"
                    value={mlAgua}
                    onChange={(e) => setMlAgua(e.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-4 pr-14 text-lg outline-none transition focus:border-emerald-400"
                    placeholder="Ex: 2"
                  />
                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-emerald-100/60">
                    ML
                  </span>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm text-slate-300">
                  MCG - Dose Desejada
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.01"
                    value={mcgDiario}
                    onChange={(e) => setMcgDiario(e.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-4 pr-16 text-lg outline-none transition focus:border-emerald-400"
                    placeholder="Ex: 500"
                  />
                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-emerald-100/60">
                    MCG
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-emerald-400/20 bg-emerald-500/10 p-6 shadow-2xl md:p-8">
              <p className="text-sm uppercase tracking-[0.2em] text-emerald-200">
                Resultado principal
              </p>
              <div className="mt-4 text-5xl font-bold text-emerald-300 md:text-7xl">
                {format(ui)} UI
              </div>
              <p className="mt-3 text-lg text-slate-200">
                {format(mcg)} mcg por dia ={" "}
                <span className="font-semibold text-white">{format(ui)} UI</span>
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-3xl border border-emerald-400/15 bg-white/[0.04] p-5">
                <p className="text-sm text-emerald-100/60">UI por mg</p>
                <div className="mt-2 text-3xl font-bold">{format(uiPorMg)} UI</div>
              </div>

              <div className="rounded-3xl border border-emerald-400/15 bg-white/[0.04] p-5">
                <p className="text-sm text-emerald-100/60">Concentração</p>
                <div className="mt-2 text-3xl font-bold">
                  {format(concentracao)} mg/mL
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
          <div className="rounded-3xl border border-emerald-400/15 bg-white/[0.04] p-6 md:p-8">
            <h2 className="mb-4 text-2xl font-bold">Como usar a calculadora</h2>

            <div className="space-y-3 leading-relaxed text-slate-300">
              <p>
                <span className="font-semibold text-white">1.</span> Informe o
                total do peptídeo em mg. Exemplo: 10 mg.
              </p>
              <p>
                <span className="font-semibold text-white">2.</span> Informe
                quantos mL de água bacteriostática foram adicionados. Exemplo: 2
                mL.
              </p>
              <p>
                <span className="font-semibold text-white">3.</span> Insira a
                dose diária em <span className="text-emerald-300">mcg</span>.
                Exemplo: 500 mcg.
              </p>
              <p>
                <span className="font-semibold text-white">4.</span> O sistema
                converte automaticamente mcg para mg e mostra o resultado final
                em UI.
              </p>
            </div>

            <div className="mt-6 rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-4 text-sm text-emerald-100">
              💡 Exemplo prático: 500 mcg = 0,5 mg. Se o frasco tiver 10 mg
              diluídos em 2 mL, o resultado será 10 UI.
            </div>

            <div className="mt-4 text-sm text-emerald-100/60">
              ⚠️ Considerando seringa de insulina padrão U-100, onde 100 UI = 1
              mL.
            </div>
          </div>

          <div className="rounded-3xl border border-emerald-400/15 bg-white/[0.04] p-6 md:p-8">
            <div className="mb-5">
              <p className="text-sm uppercase tracking-[0.25em] text-emerald-200">
                BioSyn
              </p>
              <h2 className="mt-2 text-2xl font-bold text-white">
                Redes sociais e grupo
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">
                Adicione aqui seus links oficiais para atendimento, conteúdo e
                comunidade.
              </p>
            </div>

            <div className="space-y-3">
              <a
                href="https://chat.whatsapp.com/SEU-LINK-AQUI"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between rounded-2xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-4 transition hover:bg-emerald-500/15"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-emerald-400/15 p-3 text-emerald-300">
                    <MessageCircle size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Grupo do WhatsApp</p>
                    <p className="text-sm text-emerald-100/60">
                      Link direto para entrada
                    </p>
                  </div>
                </div>
                <span className="text-sm font-medium text-emerald-300">
                  Entrar
                </span>
              </a>

              <a
                href="https://instagram.com/SEU-USUARIO"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 px-4 py-4 transition hover:border-emerald-400/20 hover:bg-white/[0.05]"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-emerald-400/15 p-3 text-emerald-300">
                    <Instagram size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Instagram</p>
                    <p className="text-sm text-emerald-100/60">@SEU-USUARIO</p>
                  </div>
                </div>
                <span className="text-sm font-medium text-emerald-300">
                  Abrir
                </span>
              </a>

              <a
                href="https://t.me/SEU-USUARIO"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 px-4 py-4 transition hover:border-emerald-400/20 hover:bg-white/[0.05]"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-emerald-400/15 p-3 text-emerald-300">
                    <Send size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Telegram</p>
                    <p className="text-sm text-emerald-100/60">
                      Canal ou suporte
                    </p>
                  </div>
                </div>
                <span className="text-sm font-medium text-emerald-300">
                  Abrir
                </span>
              </a>

              <a
                href="https://seusite.com.br"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 px-4 py-4 transition hover:border-emerald-400/20 hover:bg-white/[0.05]"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-emerald-400/15 p-3 text-emerald-300">
                    <Globe size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Site oficial</p>
                    <p className="text-sm text-emerald-100/60">
                      Página principal da marca
                    </p>
                  </div>
                </div>
                <span className="text-sm font-medium text-emerald-300">
                  Visitar
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}