var tabButtons = document.querySelectorAll(".tab-container .button-container button");
var tabPanels = document.querySelectorAll(".tab-container .tab-panel");

function showPanel(panelIndex, color)
{
    tabButtons.forEach(function(node){
        node.style.background = "";
        node.style.color = "";
    });

    tabButtons[panelIndex].style.backgroundColor = color;

    tabPanels.forEach(function(node){
        node.style.display = "none";
    });
    tabPanels[panelIndex].style.backgroundColor = color;
    tabPanels[panelIndex].style.display = "block";
    tabPanels[panelIndex].style.transition = 'all 900ms ease-in-out';
    document.getElementsByClassName("tab-container")[0].style.backgroundColor = color;
}

showPanel(0, 'green');

