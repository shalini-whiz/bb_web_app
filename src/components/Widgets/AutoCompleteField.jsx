import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';




export default function AutoSelectWidget(props) {
    const [value, setValue] = React.useState(null);

    let { options, optionKey, label, onChange } = props;
    return (
        <Autocomplete
            id="combo-box-demo"
            options={options}
            getOptionLabel={(option) => option[optionKey]}
            style={{ width: 300 }}
            value={value}
            onChange={onChange}
            renderInput={(params) => <TextField {...params} label={label} variant="outlined" />}
        />
    );
}

