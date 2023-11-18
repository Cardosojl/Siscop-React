import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import LeftBarItem from './LeftBarItem';
import LeftBarSubitem from './LeftBarSubitem';
import { Link, useLocation } from 'react-router-dom';
import useColorVariation from 'src/hooks/useColorVariation';

const LeftBarStyle = styled.div`
    color: ${({ theme }) => theme.colors.secondaryText};
    width: 250px;
    background-image: linear-gradient(to right, ${({ theme }) => `${theme.colors.secondary}, ${useColorVariation(theme.colors.secondary, [1, 1, 4])}`});
    background-repeat: repeat-y;
    background-size: auto;
    min-height: 100vh;
    font-size: 13px;
`;

const LinkStyle = styled(Link)`
    color: ${({ theme }) => theme.colors.secondaryText};
    text-decoration: none;
`;

function activeElement(values: string[], path: string): boolean {
    return values.includes(path);
}

export default function LeftBar(): JSX.Element {
    const path = useLocation().pathname.split('/')[1];
    const [changedPath, setChangedPath] = useState(path);
    const [messageArrow, setMessageArrow] = useState<boolean>(false);
    const [processArrow, setProcessArrow] = useState<boolean>(false);
    const messageItens = ['novaMensagem', 'caixaDeEntrada', 'enviadas', 'arquivadas', 'minhasMensagensRecebidas', 'minhasMensagensEnviadas', 'minhasMensagensArquivadas'];
    const processItens = ['novoProcesso', 'meusProcessos', 'processosRecebidos'];

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
                <LeftBarSubitem title={'Modelo a partir do Mapa Comparativo'} active={false} />
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
            <LeftBarItem title={'Apagar Usuário'} itemLevel={10} active={activeElement(['deletarUsuario'], changedPath)} />
        </LeftBarStyle>
    );
}
