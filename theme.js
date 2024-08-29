
const themes = [
    {
        name: 'Green Light',
        url: baseUrl + '/themes/green-light.css',
    },
    {
        name: 'Green Dark',
        url: baseUrl + '/themes/green-dark.css',
    },
    {
        name: 'Yellow Light',
        url: baseUrl + '/themes/yellow-light.css',
    },
    {
        name: 'Yellow Dark',
        url: baseUrl + '/themes/yellow-dark.css',
    },
]

const themeSelector = document.getElementById("theme-selector");

for (const theme of themes){
    const option = document.createElement("option");
    option.value = theme.url;
    option.textContent = theme.name;
    themeSelector.appendChild(option);
}

const useTheme = (url) => {
    document.querySelectorAll("link.theme").forEach(theme => {
        theme.remove();
    })
    const link = document.createElement("link");
    link.classList.add("theme");
    link.rel = "stylesheet";
    link.href = url;
    document.head.appendChild(link);
    localStorage.setItem("level-up-theme", url);
}

themeSelector.addEventListener("change", event => {
   useTheme(event.target.value);
});

const storedTheme = localStorage.getItem("level-up-theme");
if(storedTheme){
    useTheme(storedTheme);
}