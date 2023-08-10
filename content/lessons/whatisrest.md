---
title: "Что такое REST?"
date: 2023-08-04T13:01:15+03:00
draft: false
menu:
  main:
    parent: tutorials
    weight: 10
---

# Что такое REST?

<div class="my-3">
  <button class="btn btn-outline-primary btn-sm" data-bs-toggle="collapse" href="#video1" aria-expanded="false" aria-controls="collapseExample">Скрыть/Показать
    Видео</button>
</div>
<div id="video1" class="collapse show in">
  <iframe width="853" height="480" src="https://www.youtube.com/embed/llpr5924N7E" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

Архитектура REST описывается шестью ограничениями. Эти ограничения, применительно к архитектуре, первоначально были представлены Роем Филдингом (Roy Fielding) в
его [докторской диссертации](http://www.ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm) и определяют основы RESTful стиля.

#### Шесть ограничений:

<div class="accordion" id="accordionPanelsStayOpenExample">
  <div class="accordion-item">
    <h2 class="accordion-header" id="panelsStayOpen-headingOne">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
        Единый интерфейс (Uniform Interface)
      </button>
    </h2>
    <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingOne">
      <div class="accordion-body">
        <p>Единый интерфейс определяет интерфейс между клиентами и серверами.
          Это упрощает и отделяет архитектуру, которая позволяет каждой части развиваться самостоятельно.
          Четыре принципа единого интерфейса:</p>
        <h3>Основан на ресурсах</h3>
        <p>Отдельные ресурсы определяются в запросе, для чего используется URI, как идентификаторы ресурсов.
          Сами ресурсы концептуально отделены от представлений, которые возвращаются клиенту.
          Например, сервер не отправляет свою базу данных, а, скорее, некоторые HTML, XML или JSON,
          которые представляет некоторые записи в базе данных, например, на финском языке и в UTF-8,
          в зависимости от деталей запроса и реализации сервера.</p>
        <h3>Манипуляции над ресурсами через представления</h3>
        <p>Когда пользователь имеет представление о ресурсе, в том числе о связанных метаданных, он имеет
          достаточно информации для изменения или
          удаления ресурса на сервере, если у него есть на это разрешение</p>
        <h3>Самодокументируемые сообщения</h3>
        <p>Каждое сообщение содержит достаточно информации для описания того, как его выполнить.
          Например, вызываемый парсер может описываться с помощью Internet media type (так же известным как MIME)
          Ответы также явно указывают на их способность кешировать.
        <h3>Hypermedia as the Engine of Application State (HATEOAS)</h3>
        <p>Клиенты предоставляют статус через содержимое body, параметры строки запроса, заголовки запросов и
          запрашиваемый URI (имя ресурса).
          Это называется гипермедиа (или гиперссылки с гипертекстом) </p>
        <p>Наряду с приведенным выше описанием, HATEOAS также означает, что, в случае необходимости
          ссылки содержатся в теле ответа (или заголовках) для поддержки URI извлечения самого объекта или
          запрошенных объектов.
          Позднее, мы затронем эту тему глубже.</p>
        <p>Единый интерфейс так же означает, что любой REST сервис должен обеспечивать его фундаментальный дизайн.
        </p>
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header" id="panelsStayOpen-headingTwo">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
        Отсутствие состояний (Stateless)
      </button>
    </h2>
    <div id="panelsStayOpen-collapseTwo" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingTwo">
      <div class="accordion-body">
        <p>Так как REST это акроним для REpresentational State Transfer, отсутствие состояний является важной
          чертой.
          Таким образом, это значит, что необходимое состояние для обработки запроса содержится в самом запросе,
          либо в рамках URI, параметрах строки запроса, тела или заголовках.
          URI уникально идентифицирует ресурс, и тело содержит состояние (или изменение состояния) этого ресурса.
          Затем, после того, как сервер завершит обработку, состояние или его часть(и) отдаётся обратно клиенту
          через заголовки, статус и тело ответа.</p>
        <p>Большинство из нас, кто был в этой отрасли, привыкли к программированию в контейнере, который
          даёт нам понятие "Сессия, которая поддерживает состояние нескольких HTTP запросов.
          В REST, клиент должен включать всю информацию для сервера для выполнения запроса,
          по необходимости повторно отправляя состояние, если это состояние должно охватывать несколько запросов.
          Отсутствие состояний обеспечивает большую масштабируемость, так как сервер не должен поддерживать или
          общаться через состояние сеанса.
          Кроме того, балансировщику нагрузки не придётся беспокоиться о связанности сессии и системы.</p>
        <p> Так в чём различие между состоянием и ресурсом?
          Состояние или состояние приложения, это то, что сервер заботится выполнить запрос для получения данных
          необходимых для текущей сессии или запроса.
          Ресурсное состояние, или ресурс, это данные, которые определяют представление ресурса, например, данные
          хранящиеся в базе данных.
          Рассмотрим состояние приложения как данные, которые могут варьироваться в зависимости от клиента и
          запроса.
          С другой стороны, состояние ресурсов постоянно по каждому клиенту, который запрашивает его.</p>
        <p> Каждый встречал проблему с кнопкой "Назад" в своём веб приложении, когда оно ведет себя по-разному в
          одной точке, потому что ожидались действия в определенном порядке?
          Такое происходит, когда нарушен принцип отсутствия состояний. Есть случаи, когда не соблюдается принцип 
          отсутствия состояний, например, three-legged OAuth, ограничение скорости вызова API и т.д.
          Однако, приложите максимум усилий, чтобы состояние приложения не занимало несколько запросов к вашему
          сервису.</p>
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header" id="panelsStayOpen-headingThree">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
        Кеширование ответа (Cacheable)
      </button>
    </h2>
    <div id="panelsStayOpen-collapseThree" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingThree">
      <div class="accordion-body">
        <p>Как и в World Wide Web, клиент может кэшировать ответы.
        Таким образом, ответы явно или неявно определяют себя как кешируемые или нет,
        для предотвращения повторного использования клиентами устаревших или некорректных данных в ответ на
        дальнейшие запросы. Хорошо спроектированное кэширование частично или полностью устраняет некоторые клиент-серверные
        взаимодействия, способствуя дальнейшей масштабируемости и производительности.
        </p>
      </div>
    </div>
  </div>
    <div class="accordion-item">
    <h2 class="accordion-header" id="panelsStayOpen-headingFour">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseFour" aria-expanded="false" aria-controls="panelsStayOpen-collapseFour">
        Клиент-сервер (Client-Server)
      </button>
    </h2>
    <div id="panelsStayOpen-collapseFour" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingFour">
      <div class="accordion-body">
        <p>Единый интерфейс отделяет клиентов от серверов.
        Разделение интерфейсов означает, что, например, клиенты не связаны с хранением данных,
        которое остаётся внутри каждого сервера, так что мобильность кода клиента улучшается.
        Серверы не связаны с интерфейсом пользователя или состоянием, так что серверы могут быть проще и
        масштабируемы.
        Серверы и клиенты могут быть заменяемы и разрабатываться независимо, пока интерфейс не изменяется.</p>
      </div>
    </div>
  </div>
    <div class="accordion-item">
    <h2 class="accordion-header" id="panelsStayOpen-headingFive">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseFive" aria-expanded="false" aria-controls="panelsStayOpen-collapseFive">
        Многоуровневая система (Layered System)
      </button>
    </h2>
    <div id="panelsStayOpen-collapseFive" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingFive">
      <div class="accordion-body">
        <p>Обычно клиенты не могу сказать — они подключены напрямую к серверу или общаются через посредника.
        Промежуточный сервер может улучшить масштабируемость системы, обеспечивая балансировку нагрузки и
        предоставляя общий кэш.
        Слои также могут отвечать за политику безопасности.</p>
      </div>
    </div>
  </div>
    <div class="accordion-item">
    <h2 class="accordion-header" id="panelsStayOpen-headingSix">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseSix" aria-expanded="false" aria-controls="panelsStayOpen-collapseSix">
        "Код по требованию" (Code on Demand - опционально)
      </button>
    </h2>
    <div id="panelsStayOpen-collapseSix" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingSix">
      <div class="accordion-body">
        <p>Серверы могут временно расширять или настраивать функциональность
          клиента, передавая ему логику, которую он может исполнять. Например, это
          могут быть скомпилированные Java-апплеты или клиентские скрипты на
          Javascript</p>
        <p>Соблюдая эти ограничения, и, таким образом, придерживаясь RESTful архитектуры,
          мы позволяем распределенной системе любого типа иметь такие свойства как:
          производительность, расширяемость, простота, обновляемость, понятность,
          портативность и надёжность.</p>
        <p><strong>Замечание</strong> Единственным необязательным ограничением
          для RESTful архитектуры — это "код по требованию".
          Если сервис не проходит по любым другим условиям, то его совершенно точно
          нельзя назвать RESTful.</p>
      </div>
    </div>
  </div>
</div>
