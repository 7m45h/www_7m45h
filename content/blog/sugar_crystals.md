+++
description = "list of actress I like"
draft = false
keywords = ["actress", "list"]
title = "sugar_crystals"
src = "content/blog/sugar_crystals.md"
+++

{{< sugar_lister.inline >}}
  {{ with resources.Get "csvs/sugar_crystals.csv" | transform.Unmarshal }}
    <ul>
      {{ range . }}
        <li><a href="{{ collections.Index . 1 }}">{{ collections.Index . 0 }}</a></li>
      {{ end }}
    </ul>
  {{ end }}
{{</ sugar_lister.inline >}}
