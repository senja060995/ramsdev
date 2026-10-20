// "/" dialihkan ke "/id/". Pengalihan dilakukan di <head> (meta refresh + script)
// agar tetap bekerja di hosting statis apa pun.
export default function RootPage() {
  return (
    <main style={{ padding: "2rem" }}>
      <a href="/id/" style={{ color: "#3FC8E8" }}>
        Rams Dev →
      </a>
    </main>
  );
}
