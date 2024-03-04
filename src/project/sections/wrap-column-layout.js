export function wrapColumnLayout(content, document, isSubsection = false) {
    if (!isSubsection) {
        const columnLayout = document.createElement('div');
        columnLayout.classList.add('column-layout');

        const columnSide1 = document.createElement('div');
        columnSide1.classList.add('column-side');
        columnLayout.appendChild(columnSide1);

        const columnCenter = content;
        columnCenter.classList.add('column-center');
        columnLayout.appendChild(columnCenter);

        const columnSide2 = document.createElement('div');
        columnSide2.classList.add('column-side');
        columnLayout.appendChild(columnSide2);

        return columnLayout;
    } else return content;
}