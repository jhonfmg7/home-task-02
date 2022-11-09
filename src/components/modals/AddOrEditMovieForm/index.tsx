import * as React from 'react';
import styles from '../../../css-modules/modal.module.css';
import stylesHeader from '../../../css-modules/header.module.css';

// Components
import Input from './Input';

interface InitialState {
    title: string,
    date: string,
    url: string,
    rating: number,
    genre:  string | Array<string>,
    runtime: number,
    overview: string
}

interface Props {
    movie?: InitialState
}

const AddOrEditForm = (props: Props) => {

    // Props Extraction
    const { movie } = props;

    // Local State
    const initialState: InitialState = {
        title: "",
        date: "",
        url: "",
        rating: 0,
        genre: "",
        runtime: 0,
        overview: ""

    }
    const [ info, setInfo ] = React.useState(initialState);

    const handleChange = (e:React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        setInfo( oldValue => ({ ...oldValue, [ e.target.name ]: e.target.value }));
    }

    const handleReset = () => setInfo(initialState);

    React.useEffect(() => {
        setInfo(movie ?? initialState);
    }, [ movie ]);

    return (
        <form className={ styles.form }>
            <Input isLarge={ true } id="title" title="Title" info={ info } value="title" type="text" placeholder="Title" handleChange={ handleChange } />
            <Input isLarge={ false } id="date" title="Release Date" info={ info } value="date" type="date" placeholder="Select Date" handleChange={ handleChange } />
            <Input isLarge={ true } id="url" title="Movie URL" info={ info } value="url" type="text" placeholder="https://" handleChange={ handleChange } />
            <Input isLarge={ false } id="rating" title="Rating" info={ info } value="rating" type="number" placeholder="7.8" handleChange={ handleChange } />
            <Input isLarge={ true } id="genre" title="Genre" info={ info } value="genre" type="text" placeholder="Select Genre" handleChange={ handleChange } />
            <Input isLarge={ false } id="runtime" title="Runtime" info={ info } value="runtime" type="text" placeholder="minutes" handleChange={ handleChange } />
            <div className={ styles.inputGroupExtraLarge }>
                <label htmlFor="overview" className={ styles.label }>Overview</label><br />
                <textarea id="overview" cols={ 30 } rows={ 10 } name="overview" placeholder="Movie Description" className={ styles.input } value={ info["overview"] } onChange={ handleChange }></textarea>
            </div>
            <div className={ styles.textEnd }>
                <button className={ styles.secondaryButton } type="button" onClick={ handleReset }>Reset</button>
                <button className={ stylesHeader.secondaryButton }>Submit</button>
            </div>
        </form>
    )
}

export default AddOrEditForm