<?php

header('Access-Control-Allow-Origin: *');

if ($_POST['action'] !== 'load_popup') {
    echo 'You didn\'t say the magic word.';
    die();
}

?>
<link rel="stylesheet" href="/css/popupstyle.css">
<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;900&family=Rock+Salt&display=swap" rel="stylesheet">
<main>
    <header>
        <div id="logo-container">
            <div id="header-logo"></div>
            <h2>Clickup <span id="about-btn">ABouT</span> Customizer</h2>
        </div>
        <section id="about-info">
            <p>This extension will add a <span class="client-card">client card</span> button to each taskbar that links back to the client's profile.</p>
            <p>You can also <span style="font-weight: bold;">search</span> for the client below <svg width="5" aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512">
                    <path fill="currentColor" d="M252.478 408.503l-99.974 99.975c-4.697 4.697-12.311 4.697-17.008 0l-99.974-99.975c-4.696-4.697-4.696-12.311 0-17.008l8.503-8.503c4.697-4.697 12.311-4.697 17.007 0L126 447.959V36H24.024a11.996 11.996 0 0 1-8.485-3.515l-12-12C-4.021 12.926 1.333 0 12.024 0H138c13.255 0 24 10.745 24 24v423.959l64.967-64.966c4.697-4.697 12.311-4.697 17.007 0l8.503 8.503c4.697 4.696 4.697 12.31.001 17.007z"></path>
                </svg></p>
        </section>
        <hr />
        <section>
            <p id="clickup-link"><a href="https://app.clickup.com" target="_blank">Go to &nbsp;<img src="/images/clickup-icon-72x72.png">&nbsp; Homepage</a></p>
            <div id="add-remove-clients-container">
                <input type="password" name="access_code" id="access_code" placeholder="Boss-Level Cheat Code" title="To update the client list, type the magic word and hit ENTER.">
                <p id="admin-login-show">Add / Remove Clients</p>
            </div>
        </section>
    </header>
    <section id="search-container">
        <input type="text" id="searchInput" placeholder="Search clients..." title="Client Search">
    </section>
    <section id="table-container">
        <table class="table table-bordered table-hover table-condensed">
            <thead>
                <tr>
                    <th title="Service ID">Client</th>
                    <th title="Category Name">Profile</th>
                </tr>
            </thead>
            <tbody id="client-list-tbody"></tbody>
        </table>
    </section>
</main>
