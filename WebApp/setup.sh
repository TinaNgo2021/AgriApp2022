mkdir -p ~/.streamlit/
echo "\
[general]\n\
email = \"ngothinha.hn.vn@gmail.com\"\n\
" > ~/.streamlit/credentials.toml
echo "\
[server]\n\
headless = true\n\
enableCORS=false\n\
port = $PORT\n\
" > ~/.streamlit/config.toml