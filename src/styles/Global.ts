import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
    *,
    *::before,
    *::after {
    box-sizing: border-box;
}

    body {
    margin: 0;
    font-family: ${({ theme }) => theme.fonts.sans_serif}, ${({ theme }) => theme.fonts.tahoma};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: ${({ theme }) => theme.colors.background};
    font-size: 15px;
  }

  h1, h2, h3, h4, h5, h6 {
    margin-top: 0;
    margin-bottom: 0.5rem;
    line-height: 1.2;
    color: ${({ theme }) => theme.colors.primaryText};
    font-weight: bold;
  }

  h1 {
    font-size: 2.5rem;
  }

  h2 {
    font-size: 2rem;
  }

  h3 {
    font-size: 1.75rem;
  }

  h4 {
    font-size: 1.5rem;
  }

  h5 {
    font-size: 1.25rem;
  }

  h6 {
    font-size: 1rem;
  }


    hr {
        border: solid 1px ${({ theme }) => theme.colors.grey};
        margin: 10px 15px 20px 15px;
        opacity: .25;
    }

    textArea {
        resize: none;
        margin-bottom: 15px;
        margin-left: 10px;
        margin-right: 10px;
        background-color: ${({ theme }) => theme.colors.inputBackground};
        color: ${({ theme }) => theme.colors.inputText};
        border: 1px solid ${({ theme }) => theme.colors.inputBorder};
        border-radius: 3px;
        font-size: 13px;
        width: 400px;
        height: 150px;

        &:focus {
            outline: 1px solid ${({ theme }) => theme.colors.grey};
        }

        @media (max-width: 900px) {
        width: 300px;
        }
    }

    th {
        text-align: inherit;
    }

    td {
        text-align: inherit;
    }

    input {
        box-sizing: border-box;
        line-height: inherit;
        font-family: inherit;
        margin-bottom: 15px;
        margin-left: 10px;
        margin-right: 10px;
        background-color: ${({ theme }) => theme.colors.inputBackground};
        color: ${({ theme }) => theme.colors.inputText};
        border: 1px solid ${({ theme }) => theme.colors.inputBorder};
        border-radius: 3px;
        font-size: 13px;

        &:focus {
            outline: 1px solid ${({ theme }) => theme.colors.grey};
        }
    }

    form {
        margin-left: 20px;
        font-size: 14px;
    }

    select {
        margin-left: 10px;
        margin-bottom: 15px;
        background-color: ${({ theme }) => theme.colors.inputBackground};
        border-radius: 3px;
        border: 1px solid ${({ theme }) => theme.colors.inputBorder};
        margin-right: 10px;
        padding: 1px;
        color: ${({ theme }) => theme.colors.inputText};
        font-size: 13px;

        &:focus {
            outline: 1px solid ${({ theme }) => theme.colors.grey};
        }
    }

    button {
        padding: 5px;
        background-color: ${({ theme }) => theme.colors.disable};
        border: 0px;
        border-radius: 3px;
        color: ${({ theme }) => theme.colors.secondaryText};
        font-size: 12.5px;
        margin: 10px;
        width: fit-content;
        height: fit-content;
        text-decoration: none;

        &:hover {
            cursor: auto;
        }
    }

    small {
        font-size: 11.5px;
        text-decoration: none;
    }
`;
