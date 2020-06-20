import React from 'react'
import TextField from '@material-ui/core/TextField';
import Grid from "@material-ui/core/Grid"
import { MenuItem } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

class FormGenerator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formList: []
        }
    }

    componentDidMount() {
        if (this.props.formList) this.setState({ formList: this.props.formList })
    }

    componentDidUpdate(prevProps) {
        if (prevProps.formList !== this.props.formList) {
            if (this.props.formList) this.setState({ formList: this.props.formList })
        }
    }

    handleClickShowPassword = (item) => {
        if (!this.props.groups) {
            let formDataInput = [...this.state.formList];
            let showPassword;
            if (item && item.type == "password" && item.showPassword) showPassword = item.showPassword;
            item.showPassword = (!showPassword)
            formDataInput.find(nestedItem => {
                if (nestedItem.key == "password" && nestedItem.key === item.key) nestedItem = item;
            })

            this.setState({ formList: formDataInput })
        }
    }


    showDropDown = (nestedItem) => {

        const dropDownOptions = nestedItem.options.map((option, index) => {
            return (<MenuItem key={index} value={option.value} selected={(nestedItem.value === option.value)}>
                {option.key}
            </MenuItem>)
        })
        return dropDownOptions
    }


    render() {

        const { onChange, editMode, groups, classes } = this.props;
        const { formList } = this.state;


        let content = ""
        if (this.props.groupBy) {
            let md = 12;
            let xs = 12;
            if (this.props.groupBy === 3) md = 4
            if (this.props.groupBy === 2) md = 6
            content = this.props.groups.map((groupItem, groupIndex) => {
                return (
                    <Grid container spacing={1} alignItems="flex-end" key={groupIndex} >
                        {groupItem.map((item, index) => {
                            const styleObj = {};
                            if (item.hidden) styleObj["display"] = "none";

                            const variantObj = {};
                            if (item.multiline) variantObj["variant"] = "outlined"

                           
                            let checkBoxField = <FormControlLabel
                                control={<Checkbox
                                    checked={item.value}
                                    onChange={onChange}
                                    name={item.key} />}
                                label={item.displayName}
                            />

                            let textBoxField = <TextField
                                id="component-simple"
                                fullWidth
                                select={item.select}
                                autoComplete="off"
                                label={item.displayName}
                                name={item.key}
                                value={item.value}
                                onChange={onChange}
                                multiline={item.multiline}
                                step={item.step}

                                style={styleObj}
                                rowsMax={item.rowsMax}
                                rows={item.rows}
                                disabled={!editMode || item.disabled}
                                rows={item.rows}
                                type={item.type !== "select" ? item.type : ''}
                                format="dd/MM/yyyy"
                                error={(item.error && item.error.length) ? true : false}
                                helperText={item.error}
                                InputLabelProps={{ shrink: true }}>
                                {(item.select && item.options) ? (
                                    this.showDropDown(item)
                                ) : ''}

                            </TextField>

                            return (<Grid item xs={xs} md={md} key={index}>
                                {item.type === "checkbox" ? checkBoxField : textBoxField}
                            </Grid >)
                        })}</Grid>)
            })
        }
        else {
            content = formList.map((item, index) => {
                const styleObj = {};
                if (item.hidden) styleObj["display"] = "none";

                let checkBoxField = <FormControlLabel
                    control={<Checkbox
                        checked={item.value}
                        onChange={onChange}
                        name={item.key} />}
                    label={item.displayName}
                />

                let textBoxField = <TextField
                    id={item.key}
                    select={item.select}
                    key={index}
                    variant='outlined'
                    //type={item.type}
                    disabled={item.disabled ? true : false}
                    hidden={item.hidden ? true : false}
                    label={item.displayName}
                    name={item.key}
                    type={(item.type !== "select" && item.type !== "password") ? item.type : ((item.type == "password" && item.showPassword) ? 'text' : 'password')}
                    fullWidth
                    margin="normal"
                    value={item.value}
                    onChange={onChange}
                    error={(item.error && item.error.length) ? true : false}
                    helperText={item.error}
                    autoComplete="off"
                    step={item.step}

                    style={styleObj}
                    rows={item.rows}
                    multiline={item.multiline}
                    rowsMax={item.rowsMax}
                    InputLabelProps={{ shrink: true }}
                    InputProps={{
                        endAdornment: (
                            (item.type == "password") ? (<InputAdornment position="end">
                                <IconButton
                                    onClick={() => this.handleClickShowPassword(item)}
                                >
                                    {item.showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton >
                            </InputAdornment >) : false
                        ),
                    }
                    }

                >

                    {(item.select && item.options) ? (
                        this.showDropDown(item)
                    ) : ''}
                </TextField>

                return (item.type === "checkbox" ? checkBoxField : textBoxField
                )
            })
        }



        return content
    }

}


export default FormGenerator;

