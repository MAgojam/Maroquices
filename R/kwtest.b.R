
# This file is a generated template, your changes will not be overwritten

KWTestClass <- if (requireNamespace('jmvcore', quietly=TRUE)) R6::R6Class(
    "KWTestClass",
    inherit = KWTestBase,
    private = list(
        .init = function() {
            if (is.null(self$data) || is.null(self$options$dep) || is.null(self$options$group) ){
                print("Selecione as variáveis!")
                
            } else {
      
            data <- self$data
            group <- self$options$group
            groupColumn  <- as.factor(data[[group]])
            
            depName <- self$options$dep
            
            k <-  nlevels(groupColumn)
            nComps <- k*(k-1)/2
            
            for (i in seq_len(nComps-1)) {
                self$results$dunn$addRow(rowKey=i)
                self$results$DSCF$addRow(rowKey=i)
                self$results$iman$addRow(rowKey=i)}
            }
        },
        .run = function() {
            
            if (is.null(self$data) || is.null(self$options$dep) || is.null(self$options$group) ){
            return()
            } else {
            
            self$results$kw$setVisible(visible = TRUE)    

            # `self$data` contains the data
            # `self$options` contains the options
            # `self$results` contains the results object (to populate)
            
            data <- self$data
            group <- self$options$group
            groupColumn  <- as.factor(data[[group]])
            
            depName <- self$options$dep
            
            k <-  nlevels(groupColumn)
            nComps <- k*(k-1)/2
            
            method <- self$options$method
            
            formula <- jmvcore::constructFormula(self$options$dep, self$options$group)
            formula <- as.formula(formula)
            
            #KRUSKAL-WALLIS
            table <- self$results$kw
            
            depColumn <- jmvcore::toNumeric(data[[depName]])
            subset <- data.frame(y=depColumn, x=groupColumn)
            subset <- na.omit(subset)
            n <- nrow(subset)
            result <- kruskal.test(formula, data)
            es <- (result$statistic - k + 1) / (n-k)
            
            #rdep <- rank(depColumn)
            #px <- summary(aov(rdep~factor(groupColumn)))[[1]][[5]][1]
            
            kw <- coin::kruskal_test(formula, data,distribution = approximate(nresample = 10000)) #Only works with two groups
            px <- coin::pvalue(kw)[1]
            #self$results$text$setContent(result)
            
            table$setRow(rowNo=1, values=list(
                var=self$options$dep,
                chiSq=result$statistic[[1]],
                df=result$parameter[[1]],
                p=result$p.value[[1]],
                px=px,
                es=es[[1]]))
            
            self$results$plot$setVisible(visible = TRUE)   
            image <- self$results$plot
            image$setState(subset)
            
            
            #DUNN
            
            if (self$options$posts=="Dunn"){

            self$results$dunn$setVisible(visible = TRUE)  
            results <- FSA::dunnTest(formula, self$data, method=self$options$method)
            
            #self$results$text$setContent(results)
            
            table <- self$results$dunn
            
            self$results$dunn$setVisible(visible = TRUE)  
            
            pAdjTitle <- paste0("Padj (",method, ')')
            table$getColumn('Padj')$setTitle(pAdjTitle)
            
            for (i in 1:nComps) {
                table$setRow(rowNo=i, 
                             values=list(
                                 var=results$res$Comparison[[i]],
                                 Z=results$res$Z[[i]],
                                 p=results$res$P.unadj[i],
                                 Padj=results$res$P.adj[i]
                             ))}

            } else { #DSCF
              
              if (self$options$posts=="DSCF"){
                
                self$results$DSCF$setVisible(visible = TRUE)  
                
                results <- NSM3::pSDCFlig(x=depColumn,g=groupColumn)
                
                table <- self$results$DSCF
                
                self$results$DSCF$setVisible(visible = TRUE)  
                
                method <- results$method
                
                tabTitStr <- paste0("Teste Post-hoc de Dwass, Steel, Critchlow & Fligner (", method,")")
                tabTit <- jmvcore::format(tabTitStr)
                table$setTitle(tabTit)

 
                for (i in 1:nComps) {
                  table$setRow(rowNo=i, 
                               values=list(
                                 var=results$labels[i],
                                 W=results$obs.stat[i],
                                 meth=results$method[i],
                                 P=results$p.val[i]
                               ))}
              } else {
                
                if (self$options$posts=="Iman-Conover"){
                  
                  self$results$iman$setVisible(visible = TRUE)  
                  
                  results <- conover.test::conover.test(x=depColumn,g=groupColumn,method=self$options$method)
                  
                  table <- self$results$iman
                  
                  self$results$iman$setVisible(visible = TRUE)  
                  
                  method <- self$options$method
                  
                  results$P <- ifelse(results$P*2 >1,1, results$P)
                  results$P.adjusted <- ifelse(results$P.adjusted*2 >1,1, results$P.adjusted)
                  
                  pAdjTitle <- paste0("Paj (",method, ")")
                  table$getColumn('Padj')$setTitle(pAdjTitle)
                  
                  for (i in 1:nComps) {
                    table$setRow(rowNo=i, 
                                 values=list(
                                   var=results$comparisons[i],
                                   t=results$T[i],
                                   P=results$P[i],
                                   Padj=results$P.adjusted[i]
                                 ))}

              }  else { #Nenhum
                return()
              }
        }}}},
        .plot=function(image, ...) {
            
            if (is.null(self$options$dep) || is.null(self$options$group) ){
                return()
                
            } else {    
        
          plotData <- image$state
          boxplot(y~x, data=plotData, 
                  frame=F, las=1,
                  xlab = self$options$group, ylab=self$options$dep)
          TRUE
        }
        })
)
