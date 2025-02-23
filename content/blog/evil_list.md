+++
description = "list of movies I enjoyed watching"
draft = false
keywords = ["movie", "list"]
title = "evil_list"
src = "content/blog/evil_list.md"
poweredby = [
  ["impawards", "https://www.themoviedb.org/"],
  ["imdb", "https://www.imdb.com/"],
  ["evil_manager", "https://codeberg.org/7m45h/evil_manager"]
]
+++

{{< evil_lister.inline >}}
  {{ with .Site.Data.evil_list | collections.Shuffle }}
    <table>
      <thead>
        <tr>
          <th>name</th>
          <th>year</th>
          <th>imdb</th>
        </tr>
      </thead>
      <tbody>
        {{ range . }}
          <tr>
            {{ $name := ( collections.Index . 0 ) }}
            {{ $year := ( collections.Index . 1 ) }}
            {{ $imdb := ( collections.Index . 2 ) }}
            <td>{{ $name }}</td>
            <td>{{ $year }}</td>
            <td>
              <a href="https://www.imdb.com/title/tt{{ $imdb }}/" target="_blank">tt{{ $imdb}}</a>
            </td>
          </tr>
        {{ end }}
      </tbody>
    </table>
  {{ end }}
{{</ evil_lister.inline >}}
