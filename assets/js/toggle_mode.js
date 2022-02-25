

  

  

  

  const userPrefers = getComputedStyle(document.documentElement).getPropertyValue('content');	

  if (theme === "dark") {
    document.getElementById("theme-toggle").innerHTML = "&rarr; Light Mode";
  } else if (theme === "light") {
    document.getElementById("theme-toggle").innerHTML = "&rarr; Dark Mode";
  } else if  (userPrefers === "dark") {
    document.documentElement.setAttribute('data-theme', 'dark');
    window.localStorage.setItem('theme', 'dark');
    document.getElementById("theme-toggle").innerHTML = "&rarr; Light Mode";
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
    window.localStorage.setItem('theme', 'light');
    document.getElementById("theme-toggle").innerHTML = "&rarr; Dark Mode";
  }

  


