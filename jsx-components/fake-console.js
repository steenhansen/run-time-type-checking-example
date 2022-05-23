export { fakeConsole };

var fake_console = "";

function fakeConsole(added_text) {
  const what_happens = document.getElementById("what-happens");
  if (typeof added_text === "undefined") {
    fake_console = "";
  } else {
    fake_console += " > " + added_text + "\n";
  }
  what_happens.value = fake_console;
}
