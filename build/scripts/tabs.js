for (const tabs of document.querySelectorAll('.tabs-component')) {
    let selectedTab = 0;

    for (const tab of tabs.querySelectorAll('.tab')) {
        tab.addEventListener('click', event => {
            selectedTab = Array.from(tabs.querySelectorAll('.tab')).indexOf(tab);
            updateSelectedTab();
        });
    }

    updateSelectedTab();

    function updateSelectedTab() {
        for (const tab of tabs.querySelectorAll('.tab')) {
            tab.classList.remove('tab-selected');
        }

        tabs.querySelectorAll('.tab')[selectedTab].classList.add('tab-selected');

        for (const tabContent of tabs.querySelectorAll('.tab-content')) {
            tabContent.style.display = 'none';
        }

        const selectedTabContent = tabs.querySelectorAll('.tab-content')[selectedTab];
        selectedTabContent.style.display = 'block';
    }

    window.addEventListener('resize', updateSelectedTab);
}