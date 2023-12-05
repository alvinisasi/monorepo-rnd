import { InputProps } from "@/utils/types"
import { TextField } from "@mui/material"

const Input: React.FC<InputProps> = ({ value, onChange }) => {
    return(
        <TextField 
            id="outlined-basic" 
            label="Search" 
            variant="outlined"
            value={value}
            onChange={onChange}
            sx={{
                marginBottom: 8,
                width: '100%'
            }}
        />
    )
}

export default Input