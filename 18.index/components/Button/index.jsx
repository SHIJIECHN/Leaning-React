import { BtnStyleContext } from '../../context'

class StButton extends React.Component {
    render() {
        return (
            // {...this.props} 将StButton中的其他属性拿出来，包括children
            <BtnStyleContext.Consumer>
                {
                    ({ style, doClick }) => (
                        <button
                            style={style}
                            onClick={doClick}
                            {...this.props}
                        />
                    )
                }
            </BtnStyleContext.Consumer>

        )
    }
}

export default StButton;