// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    setTitle: (title:any) => ipcRenderer.invoke('set-title', title),
    setRecieve: (recieve:any) => ipcRenderer.send('set-recieve', recieve),
    handleAlegra: (alegra:any) => ipcRenderer.on('alegra-recieves',alegra),
    getConfiguration : () => ipcRenderer.invoke('get-configuration'),
    setConfiguration : (configuracion:any) => ipcRenderer.invoke('set-configuration',configuracion),
})