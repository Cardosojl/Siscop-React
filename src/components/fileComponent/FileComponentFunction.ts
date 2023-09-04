import { AxiosResponse } from 'axios';
import { siscopShow } from 'src/apis/siscopDB';

export async function handleFile(id: string): Promise<AxiosResponse> {
    const response = await siscopShow(`fileBuffer?${Date.now()}&`, 0, { _id: id });
    return response;
}

export function openFile(fileBuffer: AxiosResponse) {
    const { headers } = fileBuffer;
    const { response } = fileBuffer.data;
    if (
        headers['content-type'] === 'image/jpeg; charset=utf-8' ||
        headers['content-type'] === 'image/png; charset=utf-8' ||
        headers['content-type'] === 'application/pdf; charset=utf-8'
    ) {
        const blob = new Blob([new Uint8Array(response.file.data)], { type: headers['content-type'] });
        const url = URL.createObjectURL(blob);
        window.open(url, '_blank') as Window;
    } else {
        const blob = new Blob([new Uint8Array(response.file.data)], { type: headers['content-type'] });
        const url = URL.createObjectURL(blob);
        const downloadLink = document.createElement('a');
        downloadLink.href = url;
        const nomeDoArquivo = `${response.filename}${response.extension}`;
        downloadLink.setAttribute('download', nomeDoArquivo);
        downloadLink.click();
    }
}
