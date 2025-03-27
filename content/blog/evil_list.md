+++
description = "list of movies I enjoyed watching"
draft = false
keywords = ["movie", "list"]
title = "evil_list"
src = "content/blog/evil_list.md"
+++

{{< evil_lister.inline >}}
  {{ with .Site.Data.evil_list | collections.Shuffle }}
    <ul>
      {{ range . }}
        {{ $imdb := ( collections.Index . 0 ) }}
        {{ $name := ( collections.Index . 1 ) }}
        {{ $year := ( collections.Index . 2 ) }}
          <li><a href="https://www.imdb.com/title/tt{{ $imdb }}/">{{ $name }} &hyphen; {{ $year }}</a></li>
      {{ end }}
    </ul>
  {{ end }}
{{</ evil_lister.inline >}}
