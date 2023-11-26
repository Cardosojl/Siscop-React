import React, { useEffect, useState } from 'react';
import { LeftBarItem } from './LeftBarItem/index';
import LeftBarSubitem from './LeftBarSubItem/index';
import { useLocation } from 'react-router-dom';
import { activeElement } from './LeftBarFunctions';
import { LeftBarStyle, LinkStyle } from './LeftBar.styles';

export default function LeftBar(): JSX.Element {
    const path = useLocation().pathname.split('/')[1];
    const [changedPath, setChangedPath] = useState(path);
    const messageItens = ['novaMensagem', 'caixaDeEntrada', 'enviadas', 'arquivadas', 'minhasMensagensRecebidas', 'minhasMensagensEnviadas', 'minhasMensagensArquivadas'];
    const processItens = ['novoProcesso', 'meusProcessos', 'processosRecebidos'];
    const [messageArrow, setMessageArrow] = useState<boolean>(activeElement(messageItens, changedPath));
    const [processArrow, setProcessArrow] = useState<boolean>(activeElement(processItens, changedPath));

    useEffect(() => {
        setChangedPath(path);
        if (!messageArrow) setMessageArrow(activeElement(messageItens, changedPath));
        if (!processArrow) setProcessArrow(activeElement(processItens, changedPath));
    }, [path]);

    return (
        <LeftBarStyle>
            <LeftBarItem title={'Mensagens'} itemLevel={0} active={messageArrow} onClick={() => setMessageArrow((current) => !current)}>
                <LinkStyle to="/novaMensagem/0">
                    <LeftBarSubitem title={'Nova Mensagem'} active={activeElement(['novaMensagem'], changedPath)} />
                </LinkStyle>
                <LinkStyle to="/caixaDeEntrada/0">
                    <LeftBarSubitem title={'Caixa de Entrada'} active={activeElement(['caixaDeEntrada', 'minhasMensagensRecebidas'], changedPath)} />
                </LinkStyle>
                <LinkStyle to="/enviadas/0">
                    <LeftBarSubitem title={'Mensagens Enviadas'} active={activeElement(['enviadas', 'minhasMensagensEnviadas'], changedPath)} />
                </LinkStyle>
                <LinkStyle to="/arquivadas/0">
                    <LeftBarSubitem title={'Mensagens Arquivadas'} active={activeElement(['arquivadas', 'minhasMensagensArquivadas'], changedPath)} />
                </LinkStyle>
            </LeftBarItem>
            <LeftBarItem title={'Processos'} itemLevel={0} active={processArrow} onClick={() => setProcessArrow((current) => !current)}>
                <LinkStyle to="/novoProcesso">
                    <LeftBarSubitem title={'Cadastrar Processo'} active={activeElement(['novoProcesso'], changedPath)} />
                </LinkStyle>
                <LinkStyle to="/meusProcessos/0">
                    <LeftBarSubitem title={'Processos em Elaboração'} active={activeElement(['meusProcessos'], changedPath)} />
                </LinkStyle>
                <LinkStyle to="/processosRecebidos/0">
                    <LeftBarSubitem title={'Processos Recebidos'} active={activeElement(['processosRecebidos'], changedPath)} />
                </LinkStyle>
            </LeftBarItem>
            <LinkStyle to="/acompanharProcessos/0">
                <LeftBarItem title={'Acompanhar Processos'} itemLevel={0} active={activeElement(['acompanharProcessos'], changedPath)} />
            </LinkStyle>
            <LinkStyle to="/cadastrarUsuario">
                <LeftBarItem title={'Cadastrar Usuário'} itemLevel={10} active={activeElement(['cadastrarUsuario'], changedPath)} />
            </LinkStyle>
            <LinkStyle to="/alterarUsuario">
                <LeftBarItem title={'Alterar Usuário'} itemLevel={10} active={activeElement(['alterarUsuario'], changedPath)} />
            </LinkStyle>
        </LeftBarStyle>
    );
}
