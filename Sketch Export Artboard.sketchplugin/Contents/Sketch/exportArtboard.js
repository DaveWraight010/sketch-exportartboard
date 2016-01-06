


//-------------------------------------------------------------------------------------------------------------


// Export Artboard

function exportArtboardToPNG(context)
{
    exportArtboard(context);
}

function exportArtboard(context) 
{
	
	@import 'sandbox.js'
	
	var doc = context.document;
	var app = NSApplication.sharedApplication();
	var appController = app.delegate();
	var version = context.plugin.version().UTF8String();
	
    var page = [doc currentPage];
    var artboard = [page currentArtboard];
    var exportFileName = 'Artboard.png';

    
	
	
	if (artboard) 
    {
		exportFileName = [artboard name] + ".png";
        
		// Save panel settings
		var savePanel = NSSavePanel.savePanel();
		savePanel.setNameFieldStringValue(exportFileName);
		savePanel.setAllowedFileTypes([@"png"]);

		savePanel.setAllowsOtherFileTypes(false);
		savePanel.setExtensionHidden(false);
		
		// Open save dialog and run if Save was clicked
		if (savePanel.runModal()) 
        {
			
			// Get chosen file path
			var filePath = savePanel.URL().path();
			
			// Request permission to write for App Store version of Sketch
			new AppSandbox().authorize(@"/Users/" + NSUserName(), function() 
            {
                [doc saveArtboardOrSlice:artboard toFile:filePath];
			});	

		}
		
	} 
    else 
    { 
        app.displayDialog("There is no artboard selected"); 
    }

}



