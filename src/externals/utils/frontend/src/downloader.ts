export function printWindow(html: string) {
    const printWindow = window.open();
    if (printWindow) {
        printWindow.document.write(html);
        printWindow.document.close();
        printWindow.print();
        printWindow.close();
    }
}


export function downloadFile(file: Blob, fileName: string) {
    const urlFile = URL.createObjectURL(file)
    const link = document.createElement('a')
    link.href = urlFile
    link.setAttribute('download', fileName)
    document.body.appendChild(link)
    link.click()
    link.remove()
}