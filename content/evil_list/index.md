+++
description = "list of movies i enjoyed watching"
draft       = false
keywords    = [ "movie", "list" ]
title       = "evil_list"
gitremote   = "content/evil_list"
controls    = "h: prev r: pick random l: next"
[[powerdby]]
name = "impawards"
link = "http://www.impawards.com/"
[[powerdby]]
name = "themoviedb"
link = "https://www.themoviedb.org/"
[[powerdby]]
name = "imdb"
link = "https://www.imdb.com/"
[[powerdby]]
name = "evil manager"
link = "https://github.com/7m45h/evil_manager"
+++

{{< evil_lister.inline >}}
  {{ with site.Data.evil_list | collections.Shuffle }}
    {{ range . }}
      {{ $name := ( collections.Index . 0 ) }}
      {{ $year := ( collections.Index . 1 ) }}
      {{ $imdb := ( collections.Index . 2 ) }}
      {{ $title  := printf "%s %s" $name $year }}
      {{ $poster := printf "images/evil_posters/%s.*" $imdb }}
      <a class="evil-poster" href="https://www.imdb.com/title/tt{{ $imdb }}/" title="{{ $title }}" target="_blank">
        {{ with resources.GetMatch $poster }}
          <img src="{{ .RelPermalink }}" alt="{{ $title }}" loading="lazy">
        {{ end }}
      </a>
    {{ end }}
  {{ end }}
{{</ evil_lister.inline >}}
