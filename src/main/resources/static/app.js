async function run() {
    const res = await fetch("/run");
    const vcd = await res.text();
    parseVCD(vcd);
}

function parseVCD(vcd) {
    const lines = vcd.split("\n");
    let map = {};
    let signals = [];

    for (let l of lines) {
        if (l.startsWith("$var")) {
            const p = l.split(" ");
            map[p[3]] = { name: p[4], wave: "" };
            signals.push(map[p[3]]);
        }
        if (/^[01]/.test(l)) {
            const v = l[0];
            const s = l.slice(1).trim();
            if (map[s]) map[s].wave += v;
        }
    }

    document.getElementById("wave").innerHTML = `
    <script type="WaveDrom">
      ${JSON.stringify({ signal: signals })}
    </script>
  `;
    WaveDrom.ProcessAll();
}
