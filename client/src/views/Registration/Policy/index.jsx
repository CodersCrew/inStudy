import React, { PureComponent } from 'react';
import TriangleBackground from 'components/TriangleBackground';
import { Container} from './styles';

class Policy extends PureComponent {
    constructor(props) {
        super(props);
        window.disableHomeAnimation = true;
    }

    componentWillUnmount() {
        setTimeout(() => {
            window.disableHomeAnimation = false;
        }, 100);
    }

    render() {
        return (
            <Container>
                Policy
                <TriangleBackground />
            </Container>
        );
    }
}

export default Policy;

