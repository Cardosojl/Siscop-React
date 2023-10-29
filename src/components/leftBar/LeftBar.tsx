import React, { useEffect, useState } from 'react';
import './LeftBar.css';
import LeftBarItem from './leftBarItem/LeftBarItem';
import LeftBarSubitem from './leftBarSubitens/LeftBarSubitem';
import { Link, useLocation } from 'react-router-dom';
import { activeElement } from './leftBarFunction';

export default function LeftBar(): JSX.Element {
    const path = useLocation().pathname.split('/')[1];
    const [changedPath, setChangedPath] = useState(path);
    const messageItens = [
        'novaMensagem',
        'caixaDeEntrada',
        'enviadas',
        'arquivadas',
        'minhasMensagensRecebidas',
        'minhasMensagensEnviadas',
        'minhasMensagensArquivadas',
    ];
    const processItens = ['meusProcessos', 'processosRecebidos'];

    useEffect(() => {
        setChangedPath(path);
    }, [path]);

    return (
        <div className="LeftBar">
            <LeftBarItem title={'Mensagens'} itemLevel={0} active={activeElement(messageItens, changedPath)}>
                <Link to="/novaMensagem/0" className="Link--default LeftBar__link">
                    <LeftBarSubitem title={'Nova Mensagem'} active={activeElement(['novaMensagem'], changedPath)} />
                </Link>
                <Link to="/caixaDeEntrada/0" className="Link--default LeftBar__link">
                    <LeftBarSubitem title={'Caixa de Entrada'} active={activeElement(['caixaDeEntrada', 'minhasMensagensRecebidas'], changedPath)} />
                </Link>
                <Link to="/enviadas/0" className="Link--default LeftBar__link">
                    <LeftBarSubitem title={'Mensagens Enviadas'} active={activeElement(['enviadas', 'minhasMensagensEnviadas'], changedPath)} />
                </Link>
                <Link to="/arquivadas/0" className="Link--default LeftBar__link">
                    <LeftBarSubitem title={'Mensagens Arquivadas'} active={activeElement(['arquivadas', 'minhasMensagensArquivadas'], changedPath)} />
                </Link>
            </LeftBarItem>
            <LeftBarItem title={'Processos'} itemLevel={0} active={activeElement(processItens, changedPath)}>
                <Link to="/novoProcesso" className="Link--default LeftBar__link">
                    <LeftBarSubitem title={'Cadastrar Processo'} active={activeElement(['novoProcesso'], changedPath)} />
                </Link>
                <Link to="/meusProcessos/0" className="Link--default LeftBar__link">
                    <LeftBarSubitem title={'Processos em Elaboração'} active={activeElement(['meusProcessos'], changedPath)} />
                </Link>
                <Link to="/processosRecebidos/0" className="Link--default LeftBar__link">
                    <LeftBarSubitem title={'Processos Recebidos'} active={activeElement(['processosRecebidos'], changedPath)} />
                </Link>
                <LeftBarSubitem title={'Modelo a partir do Mapa Comparativo'} active={false} />
            </LeftBarItem>
            <Link to="/acompanharProcessos/0" className="Link--default LeftBar__link">
                <LeftBarItem title={'Acompanhar Processos'} itemLevel={0} active={activeElement(['acompanharProcessos'], changedPath)} />
            </Link>
            <Link to="/cadastrarUsuario" className="Link--default LeftBar__link">
                <LeftBarItem title={'Cadastrar Usuário'} itemLevel={10} active={activeElement(['cadastrarUsuario'], changedPath)} />
            </Link>
            <Link to="/alterarUsuario" className="Link--default LeftBar__link">
                <LeftBarItem title={'Alterar Usuário'} itemLevel={10} active={activeElement(['alterarUsuario'], changedPath)} />
            </Link>
            <LeftBarItem title={'Apagar Usuário'} itemLevel={10} active={activeElement(['deletarUsuario'], changedPath)} />
        </div>
    );
}
