import classnames from 'classnames';
import { asField } from 'informed';
import React, { Fragment } from 'react';

export const Textarea = asField(({ fieldState, faClass,fieldApi, ...props }) => {
    const { value } = fieldState;
    const { setValue, setTouched } = fieldApi;
    const { field, onChange, onBlur, initialValue, forwardedRef, ...rest } = props;
    return (
        <Fragment>
            <div className="form-group">
            {faClass && <i className={faClass}></i>}
                {props.label && <label htmlFor={field}>{props.label}</label>}
                <textarea
                    {...rest}
                    id={field}
                    ref={forwardedRef}
                    value={!value && value !== 0 ? '' : value}
                    className={classnames("form-control", { "is-invalid": fieldState.error })}
                    onChange={e => {
                        setValue(e.target.value);
                        if (onChange) {
                            onChange(e);
                        }
                    }}
                    onBlur={e => {
                        setTouched();
                        if (onBlur) {
                            onBlur(e);
                        }
                    }}
                />
                {fieldState.error ? (<div className="invalid-field">{fieldState.error}</div>) : null}
            </div>
        </Fragment>
    );
});
