+++
description = "list of movies I enjoyed watching"
draft = false
keywords = ["movie", "list"]
title = "evil_list"
src = "content/blog/evil_list.md"
+++

{{< evil_lister.inline >}}
  {{ with resources.Get "csvs/evil_list.csv" | transform.Unmarshal }}
    <ul>
      {{ range . }}
          <li><a href="https://www.imdb.com/title/tt{{ collections.Index . 0 }}/">{{ collections.Index . 1 }} &hyphen; {{ collections.Index . 2 }}</a></li>
      {{ end }}
    </ul>
  {{ end }}
{{</ evil_lister.inline >}}
