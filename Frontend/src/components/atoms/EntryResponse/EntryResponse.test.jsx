import { render } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import { AuthProvider } from "../../../contexts/Auth/AuthProvider"
import { ThemeProvider } from "@emotion/react"
import { theme } from "../../../assets/styles/theme"
import i18next from "i18next"
import { EntryResponse } from "./EntryResponse"
import { I18nextProvider } from "react-i18next"

describe('Test in <EntryResponse/>', () => { 
    test('Container must render and match snapshot', () => { 
        const {container} = render(
            <BrowserRouter>
                <AuthProvider>
                    <ThemeProvider theme={theme}>
                    <I18nextProvider i18n={i18next}>
                        <EntryResponse/>    
                    </I18nextProvider>
                    </ThemeProvider>
                </AuthProvider>
            </BrowserRouter>
        )

        expect(container).toBeTruthy();
        expect(container).toMatchSnapshot();
     })
})