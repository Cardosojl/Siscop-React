import React from 'react';
import './LeftBar.css';
import LeftBarItem from './leftBarItem/LeftBarItem';
import LeftBarSubitem from './leftBarSubitens/LeftBarSubitem';
import { Link } from 'react-router-dom';
import { activeElement } from './leftBarFunction';

export default function LeftBar(): JSX.Element {
    const messageItens = ['caixaDeEntrada', 'enviadas', 'arquivadas', 'minhasMensagensRecebidas', 'minhasMensagensEnviadas', 'minhasMensagensArquivadas'];
    const processItens = ['meusProcessos', 'processosRecebidos'];

    return (
        <div className="LeftBar">
            <LeftBarItem title={'Mensagens'} itemLevel={0} active={activeElement(messageItens)}>
                <LeftBarSubitem title={'Nova Mensagem'} active={activeElement(['novamensagem'])} />
                <Link to="/caixaDeEntrada/0" className="Link--default LeftBar__link">
                    <LeftBarSubitem title={'Caixa de Entrada'} active={activeElement(['caixaDeEntrada', 'minhasMensagensRecebidas'])} />
                </Link>
                <Link to="/enviadas/0" className="Link--default LeftBar__link">
                    <LeftBarSubitem title={'Mensagens Enviadas'} active={activeElement(['enviadas', 'minhasMensagensEnviadas'])} />
                </Link>
                <Link to="/arquivadas/0" className="Link--default LeftBar__link">
                    <LeftBarSubitem title={'Mensagens Arquivadas'} active={activeElement(['arquivadas', 'minhasMensagensArquivadas'])} />
                </Link>
            </LeftBarItem>
            <LeftBarItem title={'Processos'} itemLevel={0} active={activeElement(processItens)}>
                <LeftBarSubitem title={'Cadastrar Processo'} active={false} />
                <Link to="/meusProcessos/0" className="Link--default LeftBar__link">
                    <LeftBarSubitem title={'Processos em Elaboração'} active={activeElement(['meusProcessos'])} />
                </Link>
                <Link to="/processosRecebidos/0" className="Link--default LeftBar__link">
                    <LeftBarSubitem title={'Processos Recebidos'} active={activeElement(['processosRecebidos'])} />
                </Link>
                <LeftBarSubitem title={'Modelo a partir do Mapa Comparativo'} active={false} />
            </LeftBarItem>
            <LeftBarItem title={'Acompanhar Processos'} itemLevel={0} active={false} />
        </div>
    );
}
