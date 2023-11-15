import React from 'react';
import { connect } from 'react-redux';
import mapDispatchToProps from 'src/redux/actions/actionUsers';
import mapStateToProps from 'src/redux/selectors/selectorUsers';
import { generateBody } from './ProcessItemManagerFunction';
import { Process } from 'src/config/types/types';

function ProcessItemManager({ process }: { process: Process | undefined }): JSX.Element {
    return <>{generateBody(process)}</>;
}

export default connect(mapStateToProps, mapDispatchToProps)(ProcessItemManager);
