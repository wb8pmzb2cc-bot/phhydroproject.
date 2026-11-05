const $ = (id) => document.getElementById(id);

function entrar() {
  const nome = $("nome").value.trim();
  $("capa").classList.add("oculto");
  $("site").classList.remove("oculto");
  $("ola").textContent = nome ? "Olá, " + nome + "!" : "";
  window.scrollTo(0, 0);
}
$("formCapa").addEventListener("submit", (e) => { e.preventDefault(); entrar(); });
$("saiba").onclick = () => { entrar(); location.hash = "#oque"; };

function classificar(v) {
  if (isNaN(v) || v < 0 || v > 14) return { ok: false, t: "Inválido: digite um número de 0 a 14." };
  if (v < 6) return { ok: false, t: "Ácida: abaixo de 6,0, fora da faixa recomendada para consumo." };
  if (v > 9) return { ok: false, t: "Alcalina: acima de 9,0, fora da faixa recomendada para consumo." };
  const tipo = v < 6.8 ? "levemente ácida" : v <= 7.2 ? "neutra" : "levemente alcalina";
  return { ok: true, t: "Adequada: entre 6,0 e 9,0, dentro da faixa recomendada. Água " + tipo + "." };
}
function verificar() {
  const bruto = $("valor").value.trim().replace(",", ".");
  const caixa = $("resultado");
  if (!bruto) { caixa.className = "resultado ruim"; caixa.textContent = "Digite o valor do pH."; return; }
  const r = classificar(Number(bruto));
  caixa.className = "resultado " + (r.ok ? "bom" : "ruim");
  caixa.textContent = r.t;
}
$("verificar").onclick = verificar;
$("valor").addEventListener("keydown", (e) => { if (e.key === "Enter" || e.keyCode === 13) { e.preventDefault(); verificar(); } });

$("enviar").onclick = () => {
  const ok = $("c-ok");
  if (!$("c-nome").value.trim() || !$("c-email").value.trim() || !$("c-msg").value.trim()) {
    ok.className = "resultado ruim"; ok.textContent = "Preencha nome, e-mail e mensagem."; return;
  }
  const nome = $("c-nome").value.trim();
  const assunto = "Hydro pH - mensagem de " + nome;
  const corpo = "Nome: " + nome + "\nE-mail: " + $("c-email").value.trim() + "\n\n" + $("c-msg").value.trim();
  const url = "mailto:maheloisadiass@gmail.com?subject=" + encodeURIComponent(assunto) + "&body=" + encodeURIComponent(corpo);
  ok.className = "resultado bom";
  ok.textContent = "Abrindo seu aplicativo de e-mail. Toque em enviar para concluir. ";
  const a = document.createElement("a");
  a.href = url; a.target = "_blank"; a.rel = "noopener"; a.textContent = "Se não abrir, toque aqui.";
  ok.appendChild(a);
  window.location.href = url;
};