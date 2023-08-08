---
title: "Советы по REST API"
date: 2023-08-04T13:01:15+03:00
draft: false
menu: 
  main:
    parent: tutorials
    weight: 20
---


# Советы по REST API

Будь то RESTful или нет (в соответствии с шестью ограничениями, описанными ранее), вот несколько рекомендованных REST концепций, которые помогут построить более хорошие и удобные сервисы:

## Используйте HTTP-глаголы, чтобы ваши запросы имели понятное значение

Пользователи API должны иметь возможность отправлять команды GET, POST, PUT и DELETE, что значительно повышает ясность того, что делает запрос.

Как правило, четыре основных HTTP-глагола используются следующим образом:

GET
: Прочитать конкретный ресурс (по идентификатору) или набор ресурсов

PUT
: Обновить конкретный ресурс (по идентификатору) или набор ресурсов. Также может использоваться для создания определенного ресурса, если идентификатор ресурса известен заранее

DELETE
: Удалить конкретный ресурс по идентификатору

POST
: Создать новый ресурс. Также универсальное действие для операций, которые не вписываются в другие категории

###### Примечание
GET-запросы не должны изменять данные базовых ресурсов. При этом может выполняться отслеживание, приводящее к обновлению данных, но данные ресурса, идентифицированного данным URI, не должны изменяться.

## Давайте ресурсам продуманные имена

Создание хорошего API — это на 80% искусство и на 20% наука. Создание иерархии осмысленных URL-адресов относится к искусству. Рациональное наименование ресурсов (названия которых представляют собой просто URL-пути, такие как /customers/12345/orders) улучшает понимание того, что делает данный запрос.

Подходящие названия ресурсов предоставляют контекст для запроса и делают API сервиса более понятным. Ресурсы должны просматриваться иерархически по их именам. Пользователям должна предлагаться удобная, легко понимаемая иерархия ресурсов для использования в их приложениях.

Вот несколько простых правил для дизайна URL-пути (имени ресурса):

* Используйте идентификаторы в URL-адресах, а не в строке запроса. Использование параметров строки запроса отлично подходит для фильтрации, но не для имен ресурсов\
*Хорошо:* /users/12345\
*Плохо:* /api?type=user&id=23

* URL-адреса иерархичны, пользуйтесь этим для задания структуры ресурсов

* Дизайн сервиса должен быть ориентирован на ваших клиентов, а не на ваши данные

* Имена ресурсов должны быть существительными. Избегайте глаголов в именах ресурсов, это позволит сделать их яснее. Используйте методы HTTP, чтобы указать, какое действие выполняет запрос

* Используйте множественное число в соответствующих сегментах URL-адресов, чтобы обеспечить согласованность URI вашего API во всех HTTP-методах, применяя метафору коллекции\
*Хорошо:* /customers/33245/orders/8769/lineitems/1\
*Плохо:* /customer/33245/order/8769/lineitem/1

* Избегайте использования наборов слов в URL-адресах (например, customer_list в качестве ресурса). Используйте множественное число для названий коллекций\
*Хорошо:* /customers\
*Плохо:* /customer_list

* Используйте строчные буквы в URL, разделяя слова подчеркиванием ("_") или дефисом ("-"). Некоторые серверы игнорируют регистр, поэтому лучше четко придерживаться нижнего регистра

* Старайтесь, чтобы URL-адреса были как можно короче и содержали как можно меньше сегментов

## Используйте коды HTTP-ответов для указания статуса

Коды ответа являются частью спецификации HTTP. Для описания самых распространенных ситуаций существует большой набор HTTP-ответов.

Поскольку наши RESTful сервисы следуют спецификации HTTP, наши веб-API должны возвращать коды состояний HTTP. Например, когда ресурс успешно создан с помощью запроса POST, API должен вернуть код состояния HTTP 201. Полный список возможных кодов состояния HTTP c подробным описанием доступен [здесь]({{< ref "httpstatuscodes" >}} )

###### Top 10 кодов состояния HTTP-ответа:


200 ОК
: Код, указывающий на успешное выполнение запроса и чаще всего встречающийся на практике

201 CREATED
: Ресурс успешно создан (через POST или PUT). Установите заголовок Location со ссылкой на вновь созданный ресурс (при POST). Тело ответа может быть как пустым, так и содержать что-то
204 NO CONTENT
: Запрос выполнен успешно, но в теле ответа нет данных. Часто используется для операций DELETE и PUT

400 BAD REQUEST
: Общая ошибка, когда при выполнении запроса возникает недопустимое состояние. Примеры - ошибки проверки домена, отсутствующие данные и т.д.

401 UNAUTHORIZED
: Код ошибки для отсутствующего или недопустимого токена аутентификации

403 FORBIDDEN
: Код ошибки, когда пользователь не авторизован для выполнения операции или ресурс недоступен по какой-либо причине (например, ограничения по времени и т.п.)

404 NOT FOUND
: Этот код используется, когда запрошенный ресурс не найден. Ресурс не существует, либо была ошибка 401 или 403, которую по соображениям безопасности сервис хочет скрыть

405 METHOD NOT ALLOWED
: Используется для указания на то, что запрошенный URL-адрес существует, но используемый HTTP-метод неприменим. Например, POST /users/12345, где API не поддерживает создание ресурсов таким образом (с предоставленным идентификатором). При возврате ошибки 405 должен быть установлен HTTP-заголовок Allow, указывающий на поддерживаемые методы HTTP. В примере выше заголовок выглядел бы как "Allow: GET, PUT, DELETE"

409 CONFLICT
: Этот код ошибки отправляется всякий раз, когда выполнение запроса может привести к конфликту ресурсов. Примеры таких ситуаций - двойные записи, например, попытка создать двух клиентов с одинаковой информацией; удаление корневых объектов, когда не поддерживается каскадное удаление

500 INTERNAL SERVER ERROR
: Никогда не отправляйте этот код вручную. Это общая ошибка, когда на стороне сервера выбрасывается какое-то исключение. Этот код должен использоваться только для ошибок, которые пользователь не может устранить со своей стороны



## XML и JSON

Если вы не работаете в строго стандартизированной и регулируемой отрасли, лучше поддерживать JSON. Но если вас ничто не сковывает, позвольте пользователям выбирать в каком формате получать данные — JSON или XML. У пользователей должна быть возможность переключаться между ними с помощью HTTP-заголовка Accept или просто изменив расширение с .xml на .json.

Имейте в виду, что как только мы начинаем говорить о поддержке XML, мы начинаем говорить о валидации, пространствах имен и т.д. Если этого не требует ваша отрасль, избегайте поддержки всех этих усложнений. По крайней мере, вначале. А если в этом функционале нет острой необходимости, то всегда. JSON является простым, лаконичным и функциональным. Сделайте так, чтобы ваш XML выглядел так же, если это возможно.

Другими словами, сделайте возвращаемый XML более похожим на JSON — простым и легко читаемым, без сведений о схеме и пространстве имен, содержащим только данные и ссылки. Если ваш XML будет более сложным, стоимость поддержки будет неоправданно большой. Если судить по нашему опыту — никто никогда не отвечает в формате XML. Обрабатывать XML слишком затратно.

Обратите внимание, что [JSON-Schema](https://json-schema.org/) предлагает возможности по валидации XML, если вам все-таки нужен такой функционал.


## Создавайте детальные ресурсы

Сначала гораздо проще создавать API, которые имитируют основной домен приложения или архитектуру базы данных вашей системы. В конце концов, вы захотите объединить сервисы, которые используют несколько основных ресурсов, чтобы избежать избыточности информации. Позже будет гораздо проще создать большие ресурсы из отдельных ресурсов, чем детальные ресурсы из более крупных составных ресурсов. Упростите себе задачу и начните с небольших, легко определяемых ресурсов, предоставив для них CRUD-функциональность. Ресурсы без лишней информации, ориентированные на конкретные ситуации, можно сделать позже.

## Учитывайте связность

Одним из принципов REST является связность через ссылки. Хотя сервисы остаются полезными и без них, API становится более самоописательным, когда в ответе содержатся ссылки. По крайней мере, ссылка "на себя" информирует клиентов, как данные были или могут быть получены. Кроме того, используйте заголовок Location, который должен содержать ссылку на создание ресурса с помощью POST (или PUT). Для коллекций возвращайте в ответе сведения о том, что поддерживается пагинация, а также, как минимум, ссылки "первая", "последняя", "следующая" и "предыдущая".

Что касается форматов ссылок, то их существует довольно много.

Спецификация HTTP веб-ссылок [RFC5988](https://datatracker.ietf.org/doc/html/rfc5988) определяет ссылку следующим образом:

> Ссылка — это типизированное соединение между двумя ресурсами, идентифицируемыми интернационализированными идентификаторами 
> ресурсов (IRI) [[RFC3987]](https://datatracker.ietf.org/doc/html/rfc3987)

Ссылка состоит из:

* контекстного IRI
* типа ссылки
* целевого IRI
* целевых атрибутов (опционально)

Ссылку можно рассматривать как утверждение вида *{контекстный IRI} имеет ресурс {типа} в {целевом IRI}, который имеет {целевые атрибуты}*.

По меньшей мере, размещайте ссылки в HTTP-заголовке Link, как это рекомендовано в спецификации, или используйте JSON-представление данного стиля HTTP-ссылок (например, ссылки в стиле Atom, см. [RFC4287](https://datatracker.ietf.org/doc/html/rfc4287)). По мере того, как ваш API будет становиться более зрелым, вы сможете использовать более сложные стили ссылок, такие как [HAL+JSON](https://ru.wikipedia.org/wiki/Hypertext_Application_Language), [Siren](https://github.com/kevinswiber/siren), [Collection+JSON](http://amundsen.com/media-types/collection/) и/или [JSON-LD](https://json-ld.org/) и т.д.